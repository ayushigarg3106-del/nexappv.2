import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Lock,
  Smartphone,
  Bell,
  Key,
  Copy,
  Check,
  Edit3,
  LogOut,
  ChevronRight,
  ShieldAlert,
  Award,
  Fingerprint
} from 'lucide-react';

export default function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Profile Information State
  const [profile, setProfile] = useState({
    name: 'Ayushi Garg',
    role: 'Lead Blockchain Forensics Investigator',
    badgeId: 'NX-94821',
    email: 'ayushi.garg@nexchain.io',
    phone: '+91 98765 43210',
    department: 'Cyber Financial Crimes Division',
    region: 'APAC Hub • New Delhi',
    joined: 'March 2024',
    clearance: 'Level 4 (Classified Ledger Access)',
    keyFingerprint: '4F9B:E821:90CA:77B2',
  });

  const [editForm, setEditForm] = useState({ ...profile });
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [threatAlertsEnabled, setThreatAlertsEnabled] = useState(true);

  const handleCopyBadge = () => {
    navigator.clipboard?.writeText(profile.badgeId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <div className="profile-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Modal Handle Bar */}
        <div className="profile-modal-drag-handle" />

        {/* Top Header */}
        <div className="profile-modal-header">
          <button className="profile-close-btn" onClick={onClose} title="Close Profile">
            <X size={20} color="#64748b" />
          </button>
          <h3 className="profile-header-title">Investigator Profile</h3>
          <button
            className={`profile-edit-toggle-btn ${isEditing ? 'active' : ''}`}
            onClick={() => {
              if (isEditing) {
                setEditForm({ ...profile });
                setIsEditing(false);
              } else {
                setEditForm({ ...profile });
                setIsEditing(true);
              }
            }}
          >
            <Edit3 size={15} />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        {/* Success Toast */}
        {savedToast && (
          <div className="profile-toast-notice">
            <Check size={16} color="#10b981" />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        <div className="profile-modal-scrollable">
          {isEditing ? (
            /* Edit Profile Form */
            <form className="profile-edit-form" onSubmit={handleSaveEdit}>
              <h4 className="profile-section-heading">Edit Personal Information</h4>

              <div className="profile-field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="profile-field-group">
                <label>Professional Designation</label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  required
                />
              </div>

              <div className="profile-field-group">
                <label>Official Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="profile-field-group">
                <label>Official Phone Number</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  required
                />
              </div>

              <div className="profile-field-group">
                <label>Department / Division</label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                  required
                />
              </div>

              <div className="profile-field-group">
                <label>Jurisdiction / Station</label>
                <input
                  type="text"
                  value={editForm.region}
                  onChange={(e) => setEditForm({ ...editForm, region: e.target.value })}
                  required
                />
              </div>

              <div className="profile-edit-actions">
                <button type="button" className="btn-cancel-edit" onClick={() => setIsEditing(false)}>
                  Discard
                </button>
                <button type="submit" className="btn-save-edit">
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            /* View Profile Information */
            <>
              {/* Profile Card Centerpiece */}
              <div className="profile-main-card">
                <div className="profile-avatar-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                    alt={profile.name}
                    className="profile-avatar-img"
                  />
                  <div className="profile-verified-badge" title="Identity Verified & Active">
                    <ShieldCheck size={16} color="#ffffff" />
                  </div>
                </div>

                <h2 className="profile-name-text">{profile.name}</h2>
                <p className="profile-role-text">{profile.role}</p>

                {/* Badge ID Chip with Copy Button */}
                <div className="profile-badge-chip" onClick={handleCopyBadge} title="Click to copy Badge ID">
                  <span className="badge-chip-label">BADGE:</span>
                  <span className="badge-chip-code">{profile.badgeId}</span>
                  <button type="button" className="badge-chip-copy-icon">
                    {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} color="#64748b" />}
                  </button>
                  {copied && <span className="copied-pill">Copied!</span>}
                </div>

                <div className="profile-online-status">
                  <span className="online-beacon" />
                  <span>Verified Officer • Active Session</span>
                </div>
              </div>

              {/* 4-Metric Highlights Bar */}
              <div className="profile-stats-grid">
                <div className="profile-stat-box">
                  <span className="stat-val">184</span>
                  <span className="stat-lbl">Cases</span>
                </div>
                <div className="profile-stat-box">
                  <span className="stat-val">$6.4M</span>
                  <span className="stat-lbl">Traced</span>
                </div>
                <div className="profile-stat-box">
                  <span className="stat-val">99.8%</span>
                  <span className="stat-lbl">Accuracy</span>
                </div>
                <div className="profile-stat-box">
                  <span className="stat-val">Tier 4</span>
                  <span className="stat-lbl">Clearance</span>
                </div>
              </div>

              {/* Mandatory Personal & Contact Information */}
              <div className="profile-section-card">
                <h4 className="profile-section-heading">
                  <Award size={16} color="#6366f1" />
                  <span>Official Identification & Contact</span>
                </h4>

                <div className="profile-info-list">
                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <Mail size={16} color="#64748b" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Official Work Email</span>
                      <span className="info-item-value">{profile.email}</span>
                    </div>
                    <span className="verified-pill">Verified</span>
                  </div>

                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <Phone size={16} color="#64748b" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Emergency / Contact Phone</span>
                      <span className="info-item-value">{profile.phone}</span>
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <Building size={16} color="#64748b" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Division / Department</span>
                      <span className="info-item-value">{profile.department}</span>
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <MapPin size={16} color="#64748b" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Jurisdiction & Region</span>
                      <span className="info-item-value">{profile.region}</span>
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <Calendar size={16} color="#64748b" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Forensic Commission Date</span>
                      <span className="info-item-value">{profile.joined}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mandatory Security & Compliance */}
              <div className="profile-section-card">
                <h4 className="profile-section-heading">
                  <Lock size={16} color="#10b981" />
                  <span>Security & Ledger Clearance</span>
                </h4>

                <div className="profile-info-list">
                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <ShieldAlert size={16} color="#10b981" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Security Clearance</span>
                      <span className="info-item-value highlight-green">{profile.clearance}</span>
                    </div>
                  </div>

                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <Key size={16} color="#64748b" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Two-Factor Authentication</span>
                      <span className="info-item-value">FIDO2 Hardware Key / Authenticator</span>
                    </div>
                    <span className="status-badge-active">Enabled</span>
                  </div>

                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <Smartphone size={16} color="#64748b" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Active Authorized Device</span>
                      <span className="info-item-value">Google Pixel 7 (Android 14)</span>
                    </div>
                    <span className="verified-pill">Active</span>
                  </div>

                  <div className="profile-info-item">
                    <div className="info-item-icon">
                      <Fingerprint size={16} color="#64748b" />
                    </div>
                    <div className="info-item-content">
                      <span className="info-item-label">Cryptographic Fingerprint</span>
                      <span className="info-item-value mono-text">{profile.keyFingerprint}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Settings & App Toggles */}
              <div className="profile-section-card">
                <h4 className="profile-section-heading">
                  <Bell size={16} color="#f59e0b" />
                  <span>Security Preferences</span>
                </h4>

                <div className="profile-toggle-row">
                  <div className="toggle-label-wrap">
                    <span className="toggle-title">Biometric App Lock</span>
                    <span className="toggle-subtitle">Require Face/Fingerprint when reopening</span>
                  </div>
                  <button
                    type="button"
                    className={`profile-switch ${biometricEnabled ? 'checked' : ''}`}
                    onClick={() => setBiometricEnabled(!biometricEnabled)}
                  >
                    <span className="switch-thumb" />
                  </button>
                </div>

                <div className="profile-toggle-row">
                  <div className="toggle-label-wrap">
                    <span className="toggle-title">High-Risk Case Alerts</span>
                    <span className="toggle-subtitle">Immediate notifications for Tier 1 threats</span>
                  </div>
                  <button
                    type="button"
                    className={`profile-switch ${threatAlertsEnabled ? 'checked' : ''}`}
                    onClick={() => setThreatAlertsEnabled(!threatAlertsEnabled)}
                  >
                    <span className="switch-thumb" />
                  </button>
                </div>
              </div>

              {/* Logout / Lock Session Button */}
              <div className="profile-actions-bottom">
                <button
                  type="button"
                  className="profile-lock-session-btn"
                  onClick={() => {
                    alert('Session locked. Re-authenticate via Biometrics or PIN to resume forensic investigations.');
                    onClose();
                  }}
                >
                  <LogOut size={16} />
                  <span>Lock Investigator Workspace</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
