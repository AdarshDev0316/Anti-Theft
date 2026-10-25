import React, { useState, useEffect, useCallback } from 'react';
import { SecurityHeader } from '../components/security/SecurityHeader';
import { DeviceStatusCards } from '../components/security/DeviceStatusCards';
import { CameraMonitor } from '../components/security/CameraMonitor';
import { EventLog } from '../components/security/EventLog';
import { ProfileManager } from '../components/security/ProfileManager';
import { AlertPanel } from '../components/security/AlertPanel';
import { useCamera } from '../hooks/useCamera';
import { useDeviceStatus } from '../hooks/useDeviceStatus';
import { useEventLog } from '../hooks/useEventLog';
import { useVision } from '../hooks/useVision';
import { EnrolledProfile } from '../types/profiles';
import { ApiClient } from '../services/apiClient';

export const SecurityCenterPage: React.FC = () => {
  const camera = useCamera();
  const {
    device,
    mode,
    systemStatus,
    wsConnected,
    isSimulatingFootstep,
    lastEventTime,
    switchMode,
    triggerSimulatedFootstep,
  } = useDeviceStatus();

  const {
    events,
    isLoading: isEventsLoading,
    totalCount,
    acknowledge,
    removeEvent,
    clearAll,
    pushLocalEvent,
  } = useEventLog();

  const [profiles, setProfiles] = useState<EnrolledProfile[]>([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Fetch enrolled reference profiles
  const loadProfiles = useCallback(async () => {
    try {
      const res = await ApiClient.getProfiles();
      if (res.success) {
        setProfiles(res.data);
      }
    } catch (e) {
      console.warn('Could not load profiles from backend:', e);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  // Handle detection events coming from the computer vision engine
  const handleSecurityEventTrigger = useCallback(
    (evt: {
      eventType: 'Face Detected' | 'Known Face Match' | 'Unknown Face';
      severity: 'info' | 'warning' | 'success';
      name?: string;
      distance?: number;
      description: string;
    }) => {
      pushLocalEvent({
        eventType: evt.eventType,
        source: 'Local Browser Camera',
        severity: evt.severity,
        mode: mode,
        description: evt.description,
        metadata: {
          recognizedName: evt.name,
          distance: evt.distance,
          details: `Edge computer vision pass at entrance. Mode: ${mode}.`,
        },
      });
    },
    [mode, pushLocalEvent]
  );

  const vision = useVision({
    videoRef: camera.videoRef,
    isCameraActive: camera.isActive,
    uploadedImage: camera.uploadedImage,
    enrolledProfiles: profiles,
    onSecurityEventTrigger: handleSecurityEventTrigger,
  });

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pb-16">
      {/* 1. Header with Clock, Mode Switcher, and Connectivity */}
      <SecurityHeader
        mode={mode}
        onModeToggle={switchMode}
        deviceStatus={device.status}
        cameraStatus={camera.isActive ? 'Active' : camera.error ? 'Error' : 'Stopped'}
        wsConnected={wsConnected}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* 2. Compact System Status Cards (6 cards) */}
        <DeviceStatusCards
          device={device}
          systemStatus={systemStatus}
          lastEventTime={lastEventTime}
          isSimulatingFootstep={isSimulatingFootstep}
          cameraActive={camera.isActive}
        />

        {/* 3. Main Operational Workspace (Camera on Left, Log & Actions on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (7 cols): Live Camera Monitor & Vision Workspace */}
          <div className="lg:col-span-7 space-y-6">
            <CameraMonitor
              camera={camera}
              engine={vision.engine}
              setEngine={vision.setEngine}
              visionState={vision.state}
              detections={vision.detections}
              matchThreshold={vision.matchThreshold}
              setMatchThreshold={vision.setMatchThreshold}
              showOverlay={vision.showOverlay}
              setShowOverlay={vision.setShowOverlay}
              showLandmarks={vision.showLandmarks}
              setShowLandmarks={vision.setShowLandmarks}
              modelError={vision.modelError}
              enrolledCount={profiles.length}
              onOpenEnrollmentModal={() => setIsProfileModalOpen(true)}
            />

            {/* Hardware Trigger & Simulation Panel */}
            <AlertPanel
              onSimulateFootstep={triggerSimulatedFootstep}
              isSimulating={isSimulatingFootstep}
              isDemoMode={mode === 'DEMO'}
            />
          </div>

          {/* Right Column (5 cols): Security Audit Log & Metadata */}
          <div className="lg:col-span-5">
            <EventLog
              events={events}
              isLoading={isEventsLoading}
              totalCount={totalCount}
              onAcknowledge={acknowledge}
              onDelete={removeEvent}
              onClearAll={clearAll}
            />
          </div>

        </div>
      </div>

      {/* 4. Enrolled Profiles Management Modal */}
      <ProfileManager
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profiles={profiles}
        onProfilesChanged={loadProfiles}
        onCaptureSnapshot={camera.captureSnapshot}
      />
    </div>
  );
};
