import React, { useState } from 'react';
import { ArrowLeft, SlidersHorizontal, Info, ShieldAlert, Zap } from 'lucide-react';

export default function Screen06_RiskAnalysis({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('Risk Signals');

  const riskSignals = [
    { label: 'Anomaly Detection', pct: 24, color: '#ef4444' },
    { label: 'Pattern Analysis', pct: 18, color: '#ef4444' },
    { label: 'Network Risk', pct: 16, color: '#ef4444' },
    { label: 'Counterparty Risk', pct: 9, color: '#ef4444' },
    { label: 'Behavioral Analysis', pct: 5, color: '#ef4444' },
  ];

  const behavioralSignals = [
    { label: 'Velocity Spikes', pct: 42, color: '#f59e0b' },
    { label: 'Round Amount Splitting', pct: 35, color: '#f59e0b' },
    { label: 'Off-hours Execution', pct: 28, color: '#3b82f6' },
  ];

  const networkSignals = [
    { label: 'Mixer Proximity (1-hop)', pct: 55, color: '#ef4444' },
    { label: 'Dark Market Cluster', pct: 31, color: '#f59e0b' },
    { label: 'Exchange Hop Distance', pct: 19, color: '#3b82f6' },
  ];

  const currentList = activeTab === 'Risk Signals'
    ? riskSignals
    : activeTab === 'Behavioral'
      ? behavioralSignals
      : networkSignals;

  return (
    <div className="screen-risk-analysis">
      {/* Screen Header */}
      <div className="screen-header" style={{ padding: '0 0 6px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(5)}>
          <ArrowLeft size={18} />
        </button>
        <span className="header-title">Risk Analysis</span>
        <button className="header-icon-btn">
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* Radial Donut Speedometer Gauge Card */}
      <div className="radial-gauge-container">
        <div className="gauge-svg-box">
          <svg width="130" height="130" viewBox="0 0 120 120">
            {/* Background track */}
            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="12"
            />
            {/* Unknown: 32.7% (light gray) */}
            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="12"
              strokeDasharray="289"
              strokeDashoffset="95"
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            {/* Normal: 58.4% (blue) */}
            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="12"
              strokeDasharray="289"
              strokeDashoffset="140"
              strokeLinecap="round"
              transform="rotate(30 60 60)"
            />
            {/* Suspicious: 6.8% (orange) */}
            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="12"
              strokeDasharray="289"
              strokeDashoffset="260"
              strokeLinecap="round"
              transform="rotate(180 60 60)"
            />
            {/* High: 2.1% (red) */}
            <circle
              cx="60"
              cy="60"
              r="46"
              fill="none"
              stroke="#ef4444"
              strokeWidth="12"
              strokeDasharray="289"
              strokeDashoffset="275"
              strokeLinecap="round"
              transform="rotate(240 60 60)"
            />
          </svg>
          <div className="gauge-center-text">
            <div className="gauge-val">72</div>
            <div className="gauge-badge">High Risk</div>
          </div>
        </div>

        {/* Legend Breakdown */}
        <div className="gauge-legend-col">
          <div className="gauge-legend-item">
            <span className="gauge-legend-dot" style={{ background: '#ef4444' }} />
            <span>High <b>2.1%</b></span>
          </div>
          <div className="gauge-legend-item">
            <span className="gauge-legend-dot" style={{ background: '#f59e0b' }} />
            <span>Suspicious <b>6.8%</b></span>
          </div>
          <div className="gauge-legend-item">
            <span className="gauge-legend-dot" style={{ background: '#3b82f6' }} />
            <span>Normal <b>58.4%</b></span>
          </div>
          <div className="gauge-legend-item">
            <span className="gauge-legend-dot" style={{ background: '#cbd5e1' }} />
            <span>Unknown <b>32.7%</b></span>
          </div>
        </div>
      </div>

      {/* Tabs: Risk Signals | Behavioral | Network */}
      <div className="segmented-control">
        {['Risk Signals', 'Behavioral', 'Network'].map((tab) => (
          <button
            key={tab}
            className={`segmented-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Risk Signals Horizontal Bar Indicators */}
      <div className="risk-bars-card">
        {currentList.map((item, idx) => (
          <div key={idx} className="risk-bar-item">
            <span className="risk-bar-label">{item.label}</span>
            <div className="risk-bar-track">
              <div
                className="risk-bar-fill"
                style={{ width: `${item.pct * 2.8}%`, background: item.color }}
              />
            </div>
            <span className="risk-bar-val">{item.pct}%</span>
          </div>
        ))}
      </div>

      {/* Legal & Forensic Disclaimer */}
      <div className="risk-disclaimer-card">
        <Info size={18} color="#2563eb" style={{ flexShrink: 0 }} />
        <span>Risk score indicates investigative priority, not criminality.</span>
      </div>

      {/* Quick navigation to flow */}
      <button
        className="btn-primary-blue"
        onClick={() => onNavigate(8)}
        style={{ marginTop: 'auto' }}
      >
        View Transaction Flow →
      </button>
    </div>
  );
}
