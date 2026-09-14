import React, { useState, useEffect } from 'react';
import { X, Check, RotateCcw, ArrowUpRight, ArrowDownRight, Layers, AlertTriangle, ShieldCheck, GitCommit, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function EditMetricsModal({ isOpen, onClose, metrics, onSaveMetrics, onResetMetrics }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    transactionsVal: metrics?.transactions?.val || '12,841',
    transactionsTrend: metrics?.transactions?.trend || '24%',
    transactionsIsUp: metrics?.transactions?.isUp ?? true,

    highRiskVal: metrics?.highRisk?.val || '37',
    highRiskTrend: metrics?.highRisk?.trend || '12%',
    highRiskIsUp: metrics?.highRisk?.isUp ?? true,

    underReviewVal: metrics?.underReview?.val || '124',
    underReviewTrend: metrics?.underReview?.trend || '8%',
    underReviewIsUp: metrics?.underReview?.isUp ?? true,

    connectionsVal: metrics?.connections?.val || '8,421',
    connectionsTrend: metrics?.connections?.trend || '31%',
    connectionsIsUp: metrics?.connections?.isUp ?? true,
  });

  const handleApplyPreset = (presetType) => {
    if (presetType === 'surge') {
      setFormData({
        transactionsVal: '28,490',
        transactionsTrend: '68%',
        transactionsIsUp: true,
        highRiskVal: '89',
        highRiskTrend: '45%',
        highRiskIsUp: true,
        underReviewVal: '312',
        underReviewTrend: '22%',
        underReviewIsUp: true,
        connectionsVal: '19,820',
        connectionsTrend: '84%',
        connectionsIsUp: true,
      });
    } else if (presetType === 'calm') {
      setFormData({
        transactionsVal: '4,120',
        transactionsTrend: '14%',
        transactionsIsUp: false,
        highRiskVal: '8',
        highRiskTrend: '30%',
        highRiskIsUp: false,
        underReviewVal: '28',
        underReviewTrend: '5%',
        underReviewIsUp: false,
        connectionsVal: '2,940',
        connectionsTrend: '11%',
        connectionsIsUp: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      transactions: {
        val: formData.transactionsVal.trim() || '12,841',
        label: 'Transactions',
        trend: formData.transactionsTrend.trim() || '24%',
        isUp: formData.transactionsIsUp
      },
      highRisk: {
        val: formData.highRiskVal.trim() || '37',
        label: 'High Risk',
        trend: formData.highRiskTrend.trim() || '12%',
        isUp: formData.highRiskIsUp
      },
      underReview: {
        val: formData.underReviewVal.trim() || '124',
        label: 'Under Review',
        trend: formData.underReviewTrend.trim() || '8%',
        isUp: formData.underReviewIsUp
      },
      connections: {
        val: formData.connectionsVal.trim() || '8,421',
        label: 'Connections',
        trend: formData.connectionsTrend.trim() || '31%',
        isUp: formData.connectionsIsUp
      }
    };
    onSaveMetrics(updated);
    onClose();
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div 
        className="profile-modal-sheet" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Drag Handle */}
        <div className="modal-drag-pill" />

        {/* Modal Header */}
        <div className="profile-modal-header" style={{ marginBottom: '14px' }}>
          <button className="modal-close-circle" onClick={onClose}>
            <X size={18} />
          </button>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
              Edit Dashboard Metrics
            </h3>
            <p style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
              Transactions • Risk • Review • Connections
            </p>
          </div>
          <button 
            type="button" 
            className="modal-close-circle" 
            onClick={() => {
              if (onResetMetrics) onResetMetrics();
              onClose();
            }}
            title="Reset to defaults"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Quick Simulation Presets */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button 
            type="button" 
            className="investigate-filter-chip"
            onClick={() => handleApplyPreset('surge')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          >
            <Sparkles size={13} color="#ef4444" />
            <span>High Risk Surge</span>
          </button>
          <button 
            type="button" 
            className="investigate-filter-chip"
            onClick={() => handleApplyPreset('calm')}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
          >
            <Sparkles size={13} color="#10b981" />
            <span>Low Volume</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* 1. TRANSACTIONS CARD */}
          <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="metric-icon-box blue" style={{ width: 28, height: 28 }}>
                <Layers size={15} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>1. Transactions</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>TOTAL VOLUME</label>
                <input
                  type="text"
                  value={formData.transactionsVal}
                  onChange={(e) => setFormData({ ...formData, transactionsVal: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #cbd5e1', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginTop: '3px' }}
                  id="input-edit-transactions-val"
                  placeholder="e.g. 15,200"
                />
              </div>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#64748b' }}>TREND %</label>
                <input
                  type="text"
                  value={formData.transactionsTrend}
                  onChange={(e) => setFormData({ ...formData, transactionsTrend: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #cbd5e1', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginTop: '3px' }}
                  placeholder="e.g. 24%"
                />
              </div>
            </div>
          </div>

          {/* 2. HIGH RISK CARD */}
          <div style={{ background: '#fff5f5', border: '1.5px solid #fecaca', borderRadius: '14px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="metric-icon-box red" style={{ width: 28, height: 28 }}>
                <AlertTriangle size={15} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>2. High Risk Alerts</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#dc2626' }}>CRITICAL ALERTS</label>
                <input
                  type="text"
                  value={formData.highRiskVal}
                  onChange={(e) => setFormData({ ...formData, highRiskVal: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #fca5a5', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#991b1b', marginTop: '3px' }}
                  id="input-edit-highrisk-val"
                  placeholder="e.g. 42"
                />
              </div>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#dc2626' }}>RISK DELTA</label>
                <input
                  type="text"
                  value={formData.highRiskTrend}
                  onChange={(e) => setFormData({ ...formData, highRiskTrend: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #fca5a5', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#991b1b', marginTop: '3px' }}
                  placeholder="e.g. 18%"
                />
              </div>
            </div>
          </div>

          {/* 3. UNDER REVIEW CARD */}
          <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '14px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="metric-icon-box orange" style={{ width: 28, height: 28 }}>
                <ShieldCheck size={15} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#d97706' }}>3. Cases Under Review</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#b45309' }}>ACTIVE CASES</label>
                <input
                  type="text"
                  value={formData.underReviewVal}
                  onChange={(e) => setFormData({ ...formData, underReviewVal: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #fcd34d', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#78350f', marginTop: '3px' }}
                  id="input-edit-underreview-val"
                  placeholder="e.g. 150"
                />
              </div>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#b45309' }}>AUDIT RATE</label>
                <input
                  type="text"
                  value={formData.underReviewTrend}
                  onChange={(e) => setFormData({ ...formData, underReviewTrend: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #fcd34d', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#78350f', marginTop: '3px' }}
                  placeholder="e.g. 12%"
                />
              </div>
            </div>
          </div>

          {/* 4. CONNECTIONS CARD */}
          <div style={{ background: '#faf5ff', border: '1.5px solid #e9d5ff', borderRadius: '14px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="metric-icon-box purple" style={{ width: 28, height: 28 }}>
                <GitCommit size={15} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#7e22ce' }}>4. Active Network Connections</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#6b21a8' }}>NODE CLUSTERS</label>
                <input
                  type="text"
                  value={formData.connectionsVal}
                  onChange={(e) => setFormData({ ...formData, connectionsVal: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #d8b4fe', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#581c87', marginTop: '3px' }}
                  id="input-edit-connections-val"
                  placeholder="e.g. 10,500"
                />
              </div>
              <div>
                <label style={{ fontSize: '10.5px', fontWeight: 700, color: '#6b21a8' }}>DENSITY</label>
                <input
                  type="text"
                  value={formData.connectionsTrend}
                  onChange={(e) => setFormData({ ...formData, connectionsTrend: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #d8b4fe', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#581c87', marginTop: '3px' }}
                  placeholder="e.g. 35%"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="profile-edit-actions" style={{ marginTop: '8px' }}>
            <button type="button" className="btn-cancel-edit" onClick={onClose}>
              Discard
            </button>
            <button type="submit" className="btn-save-edit" id="btn-save-metrics">
              Save Dashboard Metrics
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
