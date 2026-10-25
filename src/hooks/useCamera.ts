import { useState, useEffect, useRef, useCallback } from 'react';
import { CameraService, VideoDeviceInfo } from '../services/cameraService';

export interface UseCameraResult {
  videoRef: React.RefObject<HTMLVideoElement>;
  isActive: boolean;
  isLoading: boolean;
  isSupported: boolean;
  error: string | null;
  devices: VideoDeviceInfo[];
  activeDeviceId: string | null;
  uploadedImage: string | null;
  startCamera: (deviceId?: string) => Promise<void>;
  stopCamera: () => void;
  switchCamera: () => Promise<void>;
  captureSnapshot: () => string | null;
  handleImageUpload: (file: File) => Promise<string>;
  clearImageUpload: () => void;
  clearError: () => void;
}

export function useCamera(): UseCameraResult {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<VideoDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    CameraService.isCameraSupported().then(supported => {
      setIsSupported(supported);
      if (supported) {
        CameraService.getAvailableVideoDevices().then(setDevices);
      }
    });

    return () => {
      CameraService.stopStream();
    };
  }, []);

  const startCamera = useCallback(async (deviceId?: string) => {
    setIsLoading(true);
    setError(null);
    setUploadedImage(null);

    try {
      const stream = await CameraService.startStream(deviceId);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsActive(true);
      if (deviceId) {
        setActiveDeviceId(deviceId);
      } else {
        const track = stream.getVideoTracks()[0];
        const settings = track?.getSettings();
        if (settings?.deviceId) setActiveDeviceId(settings.deviceId);
      }

      // Refresh devices with labels after permission granted
      const refreshed = await CameraService.getAvailableVideoDevices();
      setDevices(refreshed);
    } catch (err: any) {
      setError(err.message || 'Unable to start camera.');
      setIsActive(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    CameraService.stopStream();
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  const switchCamera = useCallback(async () => {
    if (devices.length <= 1) return;
    const currentIndex = devices.findIndex(d => d.deviceId === activeDeviceId);
    const nextIndex = (currentIndex + 1) % devices.length;
    const nextDevice = devices[nextIndex];
    await startCamera(nextDevice.deviceId);
  }, [devices, activeDeviceId, startCamera]);

  const captureSnapshot = useCallback((): string | null => {
    if (videoRef.current) {
      return CameraService.captureSnapshot(videoRef.current);
    }
    return null;
  }, []);

  const handleImageUpload = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPEG, PNG, WebP).');
        reject(new Error('Invalid file type'));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        stopCamera();
        setUploadedImage(result);
        setError(null);
        resolve(result);
      };
      reader.onerror = () => {
        setError('Failed to read uploaded image.');
        reject(new Error('File read failure'));
      };
      reader.readAsDataURL(file);
    });
  }, [stopCamera]);

  const clearImageUpload = useCallback(() => {
    setUploadedImage(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    videoRef,
    isActive,
    isLoading,
    isSupported,
    error,
    devices,
    activeDeviceId,
    uploadedImage,
    startCamera,
    stopCamera,
    switchCamera,
    captureSnapshot,
    handleImageUpload,
    clearImageUpload,
    clearError,
  };
}
