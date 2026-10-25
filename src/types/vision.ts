export type VisionEngineType = 'face-api' | 'mediapipe';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceDetectionResult {
  box: BoundingBox;
  confidence: number;
  landmarks?: Array<{ x: number; y: number }>;
  descriptor?: Float32Array | number[];
  recognitionMatch?: {
    profileId: string;
    name: string;
    role?: string;
    distance: number;
    isMatch: boolean;
  };
  status: 'KNOWN_MATCH' | 'UNKNOWN_FACE' | 'LOW_CONFIDENCE' | 'DETECTED_ONLY';
}

export type VisionProcessingState =
  | 'idle'
  | 'loading_models'
  | 'ready'
  | 'processing'
  | 'error'
  | 'unsupported';
