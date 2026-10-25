import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';
import { FaceDetectionResult } from '../types/vision';

export class MediaPipeFaceService {
  private static detector: FaceDetector | null = null;
  private static isLoading = false;
  private static isInitialized = false;

  public static async initialize(): Promise<void> {
    if (this.isInitialized && this.detector) return;
    if (this.isLoading) return;

    this.isLoading = true;
    try {
      // First attempt to load wasm from local bundle /wasm, fallback to CDN if needed
      let vision;
      try {
        vision = await FilesetResolver.forVisionTasks('/wasm');
      } catch (e) {
        console.warn('Local /wasm unavailable for MediaPipe, using official CDN fallback...', e);
        vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
      }

      this.detector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/blaze_face_short_range.tflite',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        minDetectionConfidence: 0.5,
      });

      this.isInitialized = true;
      console.log('[MediaPipe] BlazeFace Detector loaded successfully.');
    } catch (err) {
      console.error('[MediaPipe] Failed to initialize face detector:', err);
      throw err;
    } finally {
      this.isLoading = false;
    }
  }

  public static isReady(): boolean {
    return this.isInitialized && this.detector !== null;
  }

  public static detectVideoFrame(videoElement: HTMLVideoElement, timestampMs: number): FaceDetectionResult[] {
    if (!this.detector || !videoElement || videoElement.videoWidth === 0) return [];

    try {
      const detections = this.detector.detectForVideo(videoElement, timestampMs);
      if (!detections.detections) return [];

      return detections.detections.map(det => {
        const box = det.boundingBox || { originX: 0, originY: 0, width: 0, height: 0 };
        const score = det.categories?.[0]?.score || 0.85;

        const keypoints = (det.keypoints || []).map(kp => ({
          x: kp.x * videoElement.videoWidth,
          y: kp.y * videoElement.videoHeight,
        }));

        return {
          box: {
            x: box.originX,
            y: box.originY,
            width: box.width,
            height: box.height,
          },
          confidence: Math.round(score * 100),
          landmarks: keypoints,
          status: 'DETECTED_ONLY' as const,
        };
      });
    } catch (err) {
      console.warn('[MediaPipe] Frame inference error:', err);
      return [];
    }
  }
}
