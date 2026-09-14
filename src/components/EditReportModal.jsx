import React, { useState, useEffect } from 'react';
import { X, Check, RotateCcw, AlertOctagon, ShieldAlert, FileText, User, Hash, Globe, DollarSign, Users, Trash2, Plus } from 'lucide-react';

export default function EditReportModal({ isOpen, onClose, report, onSaveReport, onDeleteReport }) {
  if (!isOpen || !report) return null;

  const [formData, setFormData] = useState({
    id: report.id || 'NX-9041',
    title: report.title || '',
    investigator: report.investigator || '',
    agency: report.agency || '',
    target: report.target || '',
    chainLabel: report.chainLabel || 'Ethereum (ERC-20)',
    riskScore: report.riskScore ?? 72,
    status: report.status || 'Under Review',
    volume: report.volume || '$1,200,000',
    counterparties: report.counterparties || '4 Entities',
    notes: report.notes || '',
    flaggedReasons: Array.isArray(report.flaggedReasons) ? [...report.flaggedReasons] : [],
  });

  const [newReasonInput, setNewReasonInput] = useState('');

  useEffect(() => {
    if (report) {
      setFormData({
        id: report.id || 'NX-9041',
        title: report.title || '',
        investigator: report.investigator || '',
        agency: report.agency || '',
        target: report.target || '',
        chainLabel: report.chainLabel || 'Ethereum (ERC-20)',
        riskScore: report.riskScore ?? 72,
        status: report.status || 'Under Review',
        volume: report.volume || '$1,200,000',
        counterparties: report.counterparties || '4 Entities',
        notes: report.notes || '',
        flaggedReasons: Array.isArray(report.flaggedReasons) ? [...report.flaggedReasons] : [],
      });
    }
  }, [report]);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleAddReason = () => {
    if (!newReasonInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      flaggedReasons: [...prev.flaggedReasons, newReasonInput.trim()],
    }));
    setNewReasonInput('');
  };

  const handleRemoveReason = (index) => {
    setFormData((prev) => ({
      ...prev,
      flaggedReasons: prev.flaggedReasons.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveReport({
      ...formData,
      riskScore: Number(formData.riskScore) || 0,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    onClose();
  };

  // Helper for dynamic risk pill color
  const getRiskColor = (score) => {
    if (score >= 80) return { bg: '#fee2e2', text: '#ef4444', label: 'Critical' };
    if (score >= 60) return { bg: '#ffedd5', text: '#f97316', label: 'High Risk' };
    if (score >= 35) return { bg: '#fef3c7', text: '#eab308', label: 'Medium' };
    return { bg: '#dcfce7', text: '#16a34a', label: 'Low / Clean' };
  };

  const riskBadge = getRiskColor(formData.riskScore);

  return (
    <div className="profile-modal-backdrop" onClick={onClose} style={{ zIndex: 99999 }}>
      <div
        className="profile-modal-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Drag Pill */}
        <div className="profile-modal-drag-handle" />

        {/* Header */}
        <div className="profile-modal-header" style={{ marginBottom: '16px' }}>
          <button type="button" className="modal-close-circle" onClick={onClose}>
            <X size={18} />
          </button>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
              Edit Case Report
            </h3>
            <p style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
              {formData.id} • Assigned Investigator Dossier
            </p>
          </div>
          <button
            type="button"
            className="modal-close-circle"
            onClick={() => {
              if (onDeleteReport) onDeleteReport(formData.id);
            }}
            title="Delete this report"
            style={{ color: '#ef4444' }}
          >
            <Trash2 size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* 1. Case Details Section */}
          <div className="profile-form-section">
            <span className="profile-section-title">
              <FileText size={13} /> Case Dossier & Investigator
            </span>

            <div className="profile-form-group">
              <label>Case Title / Operation Name</label>
              <input
                type="text"
                className="profile-form-input"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Lazarus Group Mixer Dispersion"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="profile-form-group" style={{ flex: 1 }}>
                <label>Investigator / User</label>
                <input
                  type="text"
                  className="profile-form-input"
                  value={formData.investigator}
                  onChange={(e) => handleChange('investigator', e.target.value)}
                  placeholder="e.g. Ayushi Garg"
                  required
                />
              </div>

              <div className="profile-form-group" style={{ flex: 1 }}>
                <label>Department / Agency</label>
                <input
                  type="text"
                  className="profile-form-input"
                  value={formData.agency}
                  onChange={(e) => handleChange('agency', e.target.value)}
                  placeholder="e.g. Lead Forensics"
                />
              </div>
            </div>
          </div>

          {/* 2. Target Entity & Chain */}
          <div className="profile-form-section">
            <span className="profile-section-title">
              <Hash size={13} /> Target Entity & Blockchain Network
            </span>

            <div className="profile-form-group">
              <label>Target Address / Tx Hash / IP</label>
              <input
                type="text"
                className="profile-form-input"
                value={formData.target}
                onChange={(e) => handleChange('target', e.target.value)}
                placeholder="0x... / bc1... / 185..."
                style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="profile-form-group" style={{ flex: 1 }}>
                <label>Chain / Network</label>
                <select
                  className="profile-form-input"
                  value={formData.chainLabel}
                  onChange={(e) => handleChange('chainLabel', e.target.value)}
                >
                  <option value="Ethereum (ERC-20)">Ethereum (ERC-20)</option>
                  <option value="Bitcoin (UTXO)">Bitcoin (UTXO)</option>
                  <option value="Solana (SPL)">Solana (SPL)</option>
                  <option value="Tor / P2P Relay">Tor / P2P Relay</option>
                  <option value="Hex Tx Hash">Hex Tx Hash</option>
                </select>
              </div>

              <div className="profile-form-group" style={{ flex: 1 }}>
                <label>Legal / Case Status</label>
                <select
                  className="profile-form-input"
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                >
                  <option value="Under Review">Under Review</option>
                  <option value="Escalated">Escalated</option>
                  <option value="Court Warrant">Court Warrant</option>
                  <option value="Seized / Frozen">Seized / Frozen</option>
                  <option value="Monitoring">Monitoring</option>
                  <option value="Cleared">Cleared</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Risk Score Slider */}
          <div className="profile-form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="profile-section-title" style={{ margin: 0 }}>
                <AlertOctagon size={13} /> Forensic Risk Rating
              </span>
              <div
                style={{
                  background: riskBadge.bg,
                  color: riskBadge.text,
                  fontWeight: 800,
                  fontSize: '11px',
                  padding: '3px 9px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>{formData.riskScore}/100</span>
                <span>•</span>
                <span>{riskBadge.label}</span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={formData.riskScore}
              onChange={(e) => handleChange('riskScore', e.target.value)}
              style={{ width: '100%', accentColor: riskBadge.text, margin: '8px 0' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#94a3b8' }}>
              <span>0 (Safe / Cleared)</span>
              <span>50 (Suspicious)</span>
              <span>100 (Critical Blacklist)</span>
            </div>
          </div>

          {/* 4. Financial Telemetry */}
          <div className="profile-form-section">
            <span className="profile-section-title">
              <DollarSign size={13} /> Financial & Forensic Scope
            </span>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="profile-form-group" style={{ flex: 1 }}>
                <label>Tracked Volume</label>
                <input
                  type="text"
                  className="profile-form-input"
                  value={formData.volume}
                  onChange={(e) => handleChange('volume', e.target.value)}
                  placeholder="e.g. $4.8M USDT"
                />
              </div>

              <div className="profile-form-group" style={{ flex: 1 }}>
                <label>Counterparties / Clusters</label>
                <input
                  type="text"
                  className="profile-form-input"
                  value={formData.counterparties}
                  onChange={(e) => handleChange('counterparties', e.target.value)}
                  placeholder="e.g. 6 Wallets, 2 Exchanges"
                />
              </div>
            </div>
          </div>

          {/* 5. Investigator Verdict & Case Notes */}
          <div className="profile-form-section">
            <span className="profile-section-title">
              <User size={13} /> Investigator Verdict & Case Notes
            </span>

            <div className="profile-form-group">
              <textarea
                className="profile-form-input"
                rows={3}
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Enter evidentiary findings, forensic observations, and recommended enforcement action..."
                style={{ resize: 'vertical', lineHeight: 1.4 }}
              />
            </div>
          </div>

          {/* 6. Flagged Reasons List */}
          <div className="profile-form-section">
            <span className="profile-section-title">
              <ShieldAlert size={13} /> Flagged Forensic Indicators
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
              {formData.flaggedReasons.map((reason, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    color: '#1e293b',
                  }}
                >
                  <span>• {reason}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveReason(idx)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                    title="Remove indicator"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                className="profile-form-input"
                value={newReasonInput}
                onChange={(e) => setNewReasonInput(e.target.value)}
                placeholder="Add new indicator (e.g. Peeling Chain)..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddReason();
                  }
                }}
              />
              <button
                type="button"
                className="investigate-filter-chip"
                onClick={handleAddReason}
                style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px', marginBottom: '14px' }}>
            <button
              type="button"
              className="profile-btn-secondary"
              onClick={onClose}
              style={{ flex: 1 }}
            >
              Discard
            </button>
            <button
              type="submit"
              className="profile-btn-primary"
              style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              id="btn-save-report"
            >
              <Check size={16} />
              <span>Save Case Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
