import React from 'react';
import { FaceDetectionResult } from '../../types/vision';

interface DetectionOverlayProps {
  detections: FaceDetectionResult[];
  videoWidth: number;
  videoHeight: number;
  showOverlay: boolean;
  showLandmarks: boolean;
}

export const DetectionOverlay: React.FC<DetectionOverlayProps> = ({
  detections,
  videoWidth,
  videoHeight,
  showOverlay,
  showLandmarks,
}) => {
  if (!showOverlay || detections.length === 0 || videoWidth === 0 || videoHeight === 0) {
    return null;
  }

  return (
    <svg
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {detections.map((det, idx) => {
        const { box, confidence, landmarks, recognitionMatch, status } = det;

        // Choose color based on recognition state
        let strokeColor = '#35E0D0'; // Cyan (Default detection)
        let fillColor = 'rgba(53, 224, 208, 0.08)';
        let labelBg = 'rgba(16, 24, 39, 0.9)';
        let labelText = `Face #${idx + 1} (${confidence}%)`;
        let subText = 'VERIFYING...';
        let statusBadgeColor = '#35E0D0';

        if (status === 'KNOWN_MATCH' && recognitionMatch) {
          strokeColor = '#36D399'; // Green
          fillColor = 'rgba(54, 211, 153, 0.12)';
          labelText = `MATCH: ${recognitionMatch.name}`;
          subText = `${recognitionMatch.role || 'Authorized'} • Dist: ${recognitionMatch.distance}`;
          statusBadgeColor = '#36D399';
        } else if (status === 'UNKNOWN_FACE') {
          strokeColor = '#F6BD60'; // Amber (Unknown Face / Verification Required)
          fillColor = 'rgba(246, 189, 96, 0.12)';
          labelText = `UNKNOWN INDIVIDUAL`;
          subText = 'No Enrolled Reference Match';
          statusBadgeColor = '#F6BD60';
        } else if (status === 'LOW_CONFIDENCE') {
          strokeColor = '#9AAAC0';
          fillColor = 'rgba(154, 170, 192, 0.08)';
          labelText = `LOW CONFIDENCE (${confidence}%)`;
          subText = 'Adjust Angle / Lighting';
          statusBadgeColor = '#9AAAC0';
        }

        // Bounding box dimensions
        const x = Math.max(0, box.x);
        const y = Math.max(0, box.y);
        const w = box.width;
        const h = box.height;

        // Label positioning (above box if space allows, otherwise inside top)
        const labelY = y > 45 ? y - 40 : y + 6;
        const labelHeight = 36;
        const labelWidth = Math.max(160, Math.min(260, w + 40));

        // Corner bracket length
        const cornerLen = Math.min(20, w * 0.25, h * 0.25);

        return (
          <g key={idx}>
            {/* Semi-transparent facial zone fill */}
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill={fillColor}
              rx={6}
            />

            {/* Corner Targeting Brackets */}
            {/* Top-Left */}
            <path
              d={`M ${x} ${y + cornerLen} L ${x} ${y} L ${x + cornerLen} ${y}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Top-Right */}
            <path
              d={`M ${x + w - cornerLen} ${y} L ${x + w} ${y} L ${x + w} ${y + cornerLen}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Bottom-Left */}
            <path
              d={`M ${x} ${y + h - cornerLen} L ${x} ${y + h} L ${x + cornerLen} ${y + h}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Bottom-Right */}
            <path
              d={`M ${x + w - cornerLen} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y + h - cornerLen}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Subtle dashed bounding perimeter */}
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.6"
              rx={6}
            />

            {/* 68 Facial Landmarks (if enabled and present) */}
            {showLandmarks &&
              landmarks &&
              landmarks.map((point, pIdx) => (
                <circle
                  key={pIdx}
                  cx={point.x}
                  cy={point.y}
                  r="1.5"
                  fill={strokeColor}
                  opacity="0.75"
                />
              ))}

            {/* Label Card Container */}
            <g transform={`translate(${x}, ${labelY})`}>
              <rect
                x="0"
                y="0"
                width={labelWidth}
                height={labelHeight}
                fill={labelBg}
                stroke={strokeColor}
                strokeWidth="1.2"
                rx="6"
              />
              {/* Status indicator dot */}
              <circle cx="12" cy="14" r="3.5" fill={statusBadgeColor} />
              
              {/* Primary Label */}
              <text
                x="22"
                y="17"
                fill="#F4F7FC"
                fontSize="11"
                fontWeight="700"
                fontFamily="Inter, sans-serif"
                letterSpacing="0.3"
              >
                {labelText}
              </text>

              {/* Sub-label */}
              <text
                x="12"
                y="30"
                fill="#9AAAC0"
                fontSize="9"
                fontFamily="JetBrains Mono, monospace"
              >
                {subText}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};
