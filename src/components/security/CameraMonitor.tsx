import React, { useRef, useState, useEffect } from 'react';
import {
  Camera,
  CameraOff,
  RefreshCw,
  Upload,
  Layers,
  Sliders,
  AlertCircle,
  Eye,
  CheckCircle2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DetectionOverlay } from './DetectionOverlay';
import { UseCameraResult } from '../../hooks/useCamera';
import { FaceDetectionResult, VisionEngineType, VisionProcessingState } from '../../types/vision';

interface CameraMonitorProps {
  camera: UseCameraResult;
  engine: VisionEngineType;
  setEngine: (eng: VisionEngineType) => void;
  visionState: VisionProcessingState;
  detections: FaceDetectionResult[];
  matchThreshold: number;
  setMatchThreshold: (val: number) => void;
  showOverlay: boolean;
  setShowOverlay: (val: boolean) => void;
  showLandmarks: boolean;
  setShowLandmarks: (val: boolean) => void;
  modelError: string | null;
  enrolledCount: number;
  onOpenEnrollmentModal: () => void;
}

export const CameraMonitor: React.FC<CameraMonitorProps> = ({
  camera,
  engine,
  setEngine,
  visionState,
  detections,
  matchThreshold,
  setMatchThreshold,
  showOverlay,
  setShowOverlay,
  showLandmarks,
  setShowLandmarks,
  modelError,
  enrolledCount,
  onOpenEnrollmentModal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 640, height: 480 });

  // Update container aspect ratio on video loadedmetadata
  const handleLoadedMetadata = () => {
    if (camera.videoRef.current) {
      setDimensions({
        width: camera.videoRef.current.videoWidth || 640,
        height: camera.videoRef.current.videoHeight || 480,
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await camera.handleImageUpload(file);
    }
  };

  return (
    <div className="bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header & Control Toolbar */}
      <div className="p-4 sm:p-5 border-b border-border bg-bg-secondary/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-bg-elevated border border-border">
            <Eye className="w-5 h-5 text-cyan" />
          </div>
          <div>
            <h2 className="font-bold text-text-primary text-base sm:text-lg flex items-center gap-2">
              <span>Entrance Optical Monitor</span>
              <Badge variant={camera.isActive ? 'success' : camera.uploadedImage ? 'cyan' : 'neutral'} size="sm">
                {camera.isActive ? 'LIVE STREAM' : camera.uploadedImage ? 'IMAGE AUDIT' : 'STANDBY'}
              </Badge>
            </h2>
            <p className="text-xs text-text-muted">
              Real-time face detection, 68-point landmarks & 128-d biometric identity verification.
            </p>
          </div>
        </div>

        {/* Engine Switcher & Enrolled Profile Quick Access */}
        <div className="flex items-center gap-2">
          {/* Vision Engine Selector */}
          <div className="flex items-center bg-bg-secondary p-1 rounded-lg border border-border text-xs font-mono">
            <button
              onClick={() => setEngine('face-api')}
              className={`px-2.5 py-1 rounded transition-colors ${
                engine === 'face-api'
                  ? 'bg-cyan text-bg-primary font-bold shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              title="ResNet-34 128-dimensional embedding verification against enrolled profiles"
            >
              Face-API (Recognition)
            </button>
            <button
              onClick={() => setEngine('mediapipe')}
              className={`px-2.5 py-1 rounded transition-colors ${
                engine === 'mediapipe'
                  ? 'bg-cyan text-bg-primary font-bold shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              title="Google MediaPipe BlazeFace high-speed edge detector"
            >
              MediaPipe (Detector)
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenEnrollmentModal}
            className="text-xs font-mono"
          >
            Manage Profiles ({enrolledCount})
          </Button>
        </div>
      </div>

      {/* Main Camera Viewport Container */}
      <div
        ref={containerRef}
        className="relative aspect-video bg-black/90 flex items-center justify-center overflow-hidden border-b border-border"
      >
        {/* Hidden File Input for Image Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />

        {/* Active HTML5 Video Element */}
        <video
          ref={camera.videoRef}
          autoPlay
          playsInline
          muted
          onLoadedMetadata={handleLoadedMetadata}
          className={`w-full h-full object-cover ${camera.isActive ? 'block' : 'hidden'}`}
        />

        {/* Static Uploaded Image Preview (Fallback mode) */}
        {camera.uploadedImage && !camera.isActive && (
          <img
            src={camera.uploadedImage}
            alt="Uploaded Inspection Frame"
            className="w-full h-full object-contain"
          />
        )}

        {/* Detection SVG Overlay */}
        {(camera.isActive || camera.uploadedImage) && (
          <DetectionOverlay
            detections={detections}
            videoWidth={dimensions.width}
            videoHeight={dimensions.height}
            showOverlay={showOverlay}
            showLandmarks={showLandmarks}
          />
        )}

        {/* Loading / Model Downloading State */}
        {visionState === 'loading_models' && (
          <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary/85 backdrop-blur-md border border-cyan/40 text-cyan text-xs font-mono">
            <svg className="animate-spin h-3.5 w-3.5 text-cyan" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading pre-trained vision models from /models...</span>
          </div>
        )}

        {/* Standby / Offline Placeholder Screen */}
        {!camera.isActive && !camera.uploadedImage && (
          <div className="p-8 text-center max-w-md space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-bg-card border border-border mx-auto flex items-center justify-center text-text-muted">
              <CameraOff className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-text-primary text-base">
                Camera Stream Inactive
              </h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Click <strong>"Start Camera"</strong> to begin edge video monitoring, or upload a reference photograph to test facial recognition.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="cyan"
                size="md"
                onClick={() => camera.startCamera()}
                isLoading={camera.isLoading}
                icon={<Camera className="w-4 h-4" />}
              >
                Start Camera
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => fileInputRef.current?.click()}
                icon={<Upload className="w-4 h-4" />}
              >
                Upload Photo
              </Button>
            </div>
          </div>
        )}

        {/* Error Notification Banner */}
        {(camera.error || modelError) && (
          <div className="absolute inset-x-4 bottom-4 z-30 p-3.5 rounded-xl bg-state-critical/20 border border-state-critical/40 backdrop-blur-md flex items-center justify-between text-xs text-text-primary">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-state-critical shrink-0" />
              <span>{camera.error || modelError}</span>
            </div>
            <button
              onClick={() => camera.clearError()}
              className="px-2 py-1 rounded bg-bg-primary text-[11px] font-mono hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Live HUD Detection Count Bar */}
        {(camera.isActive || camera.uploadedImage) && (
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-primary/85 backdrop-blur-md border border-border text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-text-primary">
              Faces Detected: <strong className="text-cyan">{detections.length}</strong>
            </span>
            {detections.length > 0 && (
              <span className="text-text-muted ml-1">
                ({detections.filter(d => d.status === 'KNOWN_MATCH').length} Authorized,{' '}
                {detections.filter(d => d.status === 'UNKNOWN_FACE').length} Unknown)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Camera Control Panel & Settings Footer */}
      <div className="p-4 sm:p-5 bg-bg-secondary/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        
        {/* Left: Primary Camera Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {camera.isActive ? (
            <Button
              variant="danger"
              size="sm"
              onClick={camera.stopCamera}
              icon={<CameraOff className="w-4 h-4" />}
            >
              Stop Camera
            </Button>
          ) : (
            <Button
              variant="cyan"
              size="sm"
              onClick={() => camera.startCamera()}
              isLoading={camera.isLoading}
              icon={<Camera className="w-4 h-4" />}
            >
              Start Camera
            </Button>
          )}

          {camera.devices.length > 1 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={camera.switchCamera}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Switch Lens
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            icon={<Upload className="w-3.5 h-3.5" />}
          >
            Upload Photo
          </Button>

          {camera.uploadedImage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={camera.clearImageUpload}
              icon={<Trash2 className="w-3.5 h-3.5 text-state-critical" />}
            >
              Clear Image
            </Button>
          )}
        </div>

        {/* Right: Overlays & Recognition Threshold Slider */}
        <div className="flex flex-wrap items-center gap-4">
          
          {/* Overlay Toggles */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-text-secondary select-none">
              <input
                type="checkbox"
                checked={showOverlay}
                onChange={(e) => setShowOverlay(e.target.checked)}
                className="rounded border-border text-cyan focus:ring-cyan bg-bg-elevated"
              />
              <span>Bounding Boxes</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-text-secondary select-none">
              <input
                type="checkbox"
                checked={showLandmarks}
                onChange={(e) => setShowLandmarks(e.target.checked)}
                className="rounded border-border text-cyan focus:ring-cyan bg-bg-elevated"
              />
              <span>68 Landmarks</span>
            </label>
          </div>

          {/* Threshold Slider for Face-API Euclidean Distance */}
          {engine === 'face-api' && (
            <div className="flex items-center gap-2 bg-bg-elevated px-3 py-1.5 rounded-lg border border-border">
              <span className="text-text-muted">Distance Cutoff:</span>
              <input
                type="range"
                min="0.40"
                max="0.75"
                step="0.02"
                value={matchThreshold}
                onChange={(e) => setMatchThreshold(parseFloat(e.target.value))}
                className="w-20 accent-cyan cursor-pointer"
                title="Euclidean distance threshold. Lower = stricter match requirements."
              />
              <span className="font-bold text-cyan w-9 text-right">
                {matchThreshold.toFixed(2)}
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
