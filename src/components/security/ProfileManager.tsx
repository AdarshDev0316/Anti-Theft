import React, { useState, useRef } from 'react';
import { UserCheck, UserPlus, Trash2, Camera, Upload, AlertCircle, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { EnrolledProfile, ProfileEnrollmentPayload } from '../../types/profiles';
import { FaceRecognitionService } from '../../services/faceRecognitionService';
import { ApiClient } from '../../services/apiClient';

interface ProfileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: EnrolledProfile[];
  onProfilesChanged: () => void;
  onCaptureSnapshot?: () => string | null;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({
  isOpen,
  onClose,
  profiles,
  onProfilesChanged,
  onCaptureSnapshot,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<EnrolledProfile['role']>('Resident');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setName('');
    setRole('Resident');
    setNotes('');
    setConsent(false);
    setPhotoPreview(null);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleCaptureCamera = () => {
    if (!onCaptureSnapshot) {
      setErrorMsg('Camera snapshot capture unavailable. Please start the camera first or upload an image.');
      return;
    }
    const snapshot = onCaptureSnapshot();
    if (!snapshot) {
      setErrorMsg('Could not capture frame. Ensure camera is running.');
      return;
    }
    setPhotoPreview(snapshot);
    setErrorMsg(null);
  };

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter a display name for the profile.');
      return;
    }

    if (!consent) {
      setErrorMsg('Explicit authorization/consent is required to enroll biometric reference profiles.');
      return;
    }

    if (!photoPreview) {
      setErrorMsg('Please provide a reference photograph with a clear, visible face.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create an image element to extract the 128-d descriptor
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = photoPreview;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to decode image data for descriptor extraction.'));
      });

      // 2. Extract 128-d ResNet descriptor using FaceRecognitionService
      const extractResult = await FaceRecognitionService.extractDescriptorFromElement(img);

      if (!extractResult || !extractResult.descriptor || extractResult.descriptor.length !== 128) {
        throw new Error('No face detected in reference photo. Ensure proper lighting and a frontal facial angle.');
      }

      // 3. Post to backend
      const payload: ProfileEnrollmentPayload = {
        name: name.trim(),
        role,
        photoPreviewUrl: photoPreview,
        descriptor: extractResult.descriptor,
        notes: notes.trim(),
        consentGranted: true,
      };

      const res = await ApiClient.enrollProfile(payload);
      if (res.success) {
        setSuccessMsg(`Profile "${res.data.name}" enrolled successfully with 128-d descriptor.`);
        resetForm();
        onProfilesChanged();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to enroll profile.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteProfile = async (id: string, profileName: string) => {
    if (!window.confirm(`Are you sure you want to delete profile "${profileName}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await ApiClient.deleteProfile(id);
      onProfilesChanged();
    } catch (err: any) {
      alert(`Failed to delete profile: ${err.message}`);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Clear all enrolled reference profiles? Facial recognition will return to UNKNOWN for all individuals.')) {
      return;
    }
    try {
      await ApiClient.clearAllProfiles();
      onProfilesChanged();
    } catch (err: any) {
      alert(`Failed to clear profiles: ${err.message}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Authorized Face Profile Management"
      subtitle="Consent-Based Reference Enrollment & Identity Verification"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        
        {/* Privacy & Authorization Notice */}
        <div className="p-3.5 rounded-xl bg-bg-secondary border border-border flex items-start gap-3 text-xs">
          <Lock className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
          <div className="space-y-1 text-text-secondary">
            <span className="font-semibold text-text-primary">
              Biometric Privacy Architecture:
            </span>
            <p className="leading-relaxed">
              FLOOR GUARD computes mathematical face embeddings locally in your browser. Biometric descriptors are compared only against deliberately enrolled reference faces on this deployment. No third-party facial scraping or public sharing occurs.
            </p>
          </div>
        </div>

        {/* Enrollment Form */}
        <form onSubmit={handleEnroll} className="bg-bg-elevated/40 border border-border rounded-xl p-5 space-y-4">
          <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-cyan" />
            <span>Enroll New Reference Individual</span>
          </h4>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1">
                Display Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Adarsh Srivastava"
                className="w-full px-3 py-2 rounded-lg bg-bg-card border border-border text-sm text-text-primary focus:outline-none focus:border-cyan"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-text-secondary mb-1">
                Authorization Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-bg-card border border-border text-sm text-text-primary focus:outline-none focus:border-cyan"
              >
                <option value="Resident">Resident</option>
                <option value="Authorized Staff">Authorized Staff</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Guest">Guest</option>
                <option value="Administrator">Administrator</option>
              </select>
            </div>
          </div>

          {/* Photo Input & Preview */}
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1">
              Reference Face Photo *
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                icon={<Upload className="w-3.5 h-3.5" />}
              >
                Upload File
              </Button>
              {onCaptureSnapshot && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCaptureCamera}
                  icon={<Camera className="w-3.5 h-3.5" />}
                >
                  Snap from Live Camera
                </Button>
              )}
            </div>

            {/* Photo Preview Thumbnail */}
            {photoPreview && (
              <div className="mt-3 flex items-center gap-3 p-2 bg-bg-card rounded-lg border border-border">
                <img
                  src={photoPreview}
                  alt="Reference Preview"
                  className="w-14 h-14 object-cover rounded-md border border-cyan/40"
                />
                <div className="text-xs">
                  <span className="text-state-success font-mono font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Photo Staged
                  </span>
                  <span className="text-text-muted block text-[11px]">
                    Face detector will compute 128-d descriptor on submit.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Explicit Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-text-secondary select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-border text-cyan focus:ring-cyan bg-bg-card"
                required
              />
              <span>
                I confirm that this person has given explicit authorization to register their reference facial features in this security system.
              </span>
            </label>
          </div>

          {/* Status feedback */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-state-critical/15 border border-state-critical/40 text-xs text-state-critical flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-lg bg-state-success/15 border border-state-success/40 text-xs text-state-success flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="cyan"
              size="sm"
              isLoading={isProcessing}
              icon={<UserCheck className="w-4 h-4" />}
            >
              Validate & Enroll Profile
            </Button>
          </div>
        </form>

        {/* Enrolled Profiles List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
              <span>Enrolled Authorized Identities ({profiles.length})</span>
            </h4>
            {profiles.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-mono text-state-critical hover:underline"
              >
                Clear All Profiles
              </button>
            )}
          </div>

          {profiles.length === 0 ? (
            <div className="p-6 rounded-xl bg-bg-card border border-border text-center text-xs text-text-muted space-y-1">
              <p>No reference profiles enrolled yet.</p>
              <p>Unknown individuals at the entrance will be labeled as "UNKNOWN INDIVIDUAL".</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {profiles.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-bg-card border border-border hover:border-border-bright flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    {p.photoPreviewUrl ? (
                      <img
                        src={p.photoPreviewUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded-full object-cover border border-cyan/40 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/30 text-cyan flex items-center justify-center font-bold">
                        {p.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <strong className="text-text-primary block font-semibold text-sm">
                        {p.name}
                      </strong>
                      <div className="flex items-center gap-2 text-text-muted font-mono text-[11px] mt-0.5">
                        <span className="text-cyan">{p.role}</span>
                        <span>•</span>
                        <span>128-d Vector</span>
                        <span>•</span>
                        <span>{new Date(p.enrolledAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteProfile(p.id, p.name)}
                    className="p-1.5 rounded-lg text-text-muted hover:text-state-critical hover:bg-bg-elevated transition-colors"
                    title="Delete profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
};
