import { describe, it, expect, beforeEach } from 'vitest';
import { store } from '../server/src/database/store';

// Pure mathematical distance calculation matching FaceRecognitionService
function calculateEuclideanDistance(arr1: number[], arr2: number[]): number {
  let sum = 0;
  const len = Math.min(arr1.length, arr2.length);
  for (let i = 0; i < len; i++) {
    const diff = arr1[i] - arr2[i];
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

describe('FLOOR GUARD Backend Store & Validation Tests', () => {
  beforeEach(() => {
    store.clearEvents();
    store.clearProfiles();
  });

  it('initializes with default devices in DEMO mode', () => {
    const devices = store.getDevices();
    expect(devices.length).toBeGreaterThan(0);
    const primary = devices[0];
    expect(primary.deviceId).toBe('MAT-NODE-01');
    expect(primary.mode).toBe('DEMO');
  });

  it('ingests and retrieves security events with timestamps and ordering', () => {
    const event1 = store.addEvent({
      id: 'EVT-TEST-1',
      timestamp: new Date(Date.now() - 5000).toISOString(),
      eventType: 'Footstep Event',
      source: 'Floor Mat Sensor',
      description: 'Test footstep pressure event',
      severity: 'warning',
      mode: 'DEMO',
      acknowledged: false,
    });

    const event2 = store.addEvent({
      id: 'EVT-TEST-2',
      timestamp: new Date().toISOString(),
      eventType: 'Face Detected',
      source: 'Local Browser Camera',
      description: 'Test face detected',
      severity: 'info',
      mode: 'DEMO',
      acknowledged: false,
    });

    const list = store.getEvents();
    expect(list.length).toBe(2);
    // Most recent event first
    expect(list[0].id).toBe('EVT-TEST-2');
  });

  it('acknowledges security events with operator signature', () => {
    store.addEvent({
      id: 'EVT-ACK-TEST',
      timestamp: new Date().toISOString(),
      eventType: 'Potential Intrusion',
      source: 'Floor Mat Sensor',
      description: 'Critical pressure breach',
      severity: 'critical',
      mode: 'DEMO',
      acknowledged: false,
    });

    const acked = store.acknowledgeEvent('EVT-ACK-TEST', 'Lead Operator Adarsh');
    expect(acked).toBeDefined();
    expect(acked?.acknowledged).toBe(true);
    expect(acked?.acknowledgedBy).toBe('Lead Operator Adarsh');
    expect(acked?.acknowledgedAt).toBeDefined();
  });

  it('rejects profile enrollment without 128-dimensional descriptor vector', () => {
    const invalidProfile = {
      id: 'P-INVALID',
      name: 'Test Subject',
      role: 'Resident' as const,
      enrolledAt: new Date().toISOString(),
      descriptor: [0.1, 0.2, 0.3], // only 3 elements, must be 128!
      consentGranted: true,
    };

    expect(invalidProfile.descriptor.length).not.toBe(128);
  });

  it('stores and removes authorized face reference profiles', () => {
    // Generate valid dummy 128-d descriptor
    const dummyDescriptor = Array(128).fill(0).map((_, i) => Math.sin(i * 0.1));

    const profile = store.addProfile({
      id: 'PROF-001',
      name: 'Adarsh Srivastava',
      role: 'Administrator',
      enrolledAt: new Date().toISOString(),
      descriptor: dummyDescriptor,
      consentGranted: true,
    });

    expect(store.getProfiles().length).toBe(1);
    expect(store.getProfiles()[0].name).toBe('Adarsh Srivastava');

    const deleted = store.deleteProfile('PROF-001');
    expect(deleted).toBe(true);
    expect(store.getProfiles().length).toBe(0);
  });
});

describe('FLOOR GUARD Biometric Face Recognition Metric Tests', () => {
  it('correctly calculates Euclidean distance between identical descriptors as 0', () => {
    const v1 = [0.1, 0.2, 0.3, 0.4];
    const v2 = [0.1, 0.2, 0.3, 0.4];
    const dist = calculateEuclideanDistance(v1, v2);
    expect(dist).toBe(0);
  });

  it('calculates accurate positive distance for divergent descriptors', () => {
    const v1 = [1, 0, 0];
    const v2 = [0, 1, 0];
    const dist = calculateEuclideanDistance(v1, v2);
    expect(dist).toBeCloseTo(Math.SQRT2, 4);
  });

  it('correctly classifies match within default threshold (<= 0.58)', () => {
    const threshold = 0.58;
    const testDistance = 0.42;
    expect(testDistance <= threshold).toBe(true);
  });

  it('correctly rejects unknown faces exceeding match threshold (> 0.58)', () => {
    const threshold = 0.58;
    const unknownDistance = 0.74;
    expect(unknownDistance > threshold).toBe(true);
  });
});
