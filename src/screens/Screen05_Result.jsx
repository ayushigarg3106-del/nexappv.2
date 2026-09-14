import React, { useState } from 'react';
import { ArrowLeft, Share2, GitBranch, AlertOctagon, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react';

export default function Screen05_Result({ onNavigate, queryAddress }) {
  const [activeTab, setActiveTab] = useState('Summary');

  const flaggedReasons = [
    'Unusual transaction velocity',
    '3 high-risk counterparties',
    'Suspicious cluster association',
    '2-hop risk connection',
    'Matched known pattern (Peeling Chain)',
  ];

  const target = queryAddress || '0x7a3fc894726e9c9d2e4b0113f89';
  const isBtc = target.startsWith('bc1') || target.startsWith('1') || target.startsWith('3');
  const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(target);
  const isTx = target.length > 45;

  let chainLabel = 'Ethereum (ERC-20)';
  let cryptoIcon = '⚡';
  if (isBtc) {
    chainLabel = 'Bitcoin (UTXO)';
    cryptoIcon = '₿';
  } else if (isIp) {
    chainLabel = 'Tor / P2P Relay';
    cryptoIcon = '🌐';
  } else if (isTx) {
    chainLabel = 'Hex Tx Hash';
    cryptoIcon = '🔗';
  }

  return (
    <div className="screen-result">
      {/* Header */}
      <div className="screen-header" style={{ padding: '0 0 4px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(2)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <GitBranch size={18} color="#2563eb" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Investigation Result</span>
        </div>
        <button className="header-icon-btn">
          <Share2 size={16} />
        </button>
      </div>

      {/* Target Entity Card */}
      <div className="target-entity-card" onClick={() => onNavigate(9)} title="View Address Details">
        <div className="target-crypto-icon">{cryptoIcon}</div>
        <div className="target-details-col" style={{ minWidth: 0 }}>
          <div className="target-hash-row" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {target}
          </div>
          <div className="target-tags-row">
            <span className="crypto-pill">{chainLabel}</span>
            <span className="crypto-pill">High Forensic Attention</span>
          </div>
        </div>
        <ExternalLink size={16} color="#94a3b8" />
      </div>

      {/* Big Risk Score 72 Card */}
      <div className="risk-score-banner" onClick={() => onNavigate(6)} title="View Deep Risk Analysis">
        <div className="risk-banner-header">
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Risk Score</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
              <span className="risk-score-num">72</span>
              <span className="risk-score-denom">/100</span>
            </div>
          </div>
          <div className="badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px' }}>
            <AlertOctagon size={14} />
            <span>High Risk</span>
          </div>
        </div>

        {/* Animated Risk Wave Chart */}
        <div className="risk-wave-chart">
          <svg width="100%" height="44" viewBox="0 0 300 44" fill="none" preserveAspectRatio="none">
            <path
              d="M0 38 C 40 40, 70 12, 110 24 C 150 36, 180 8, 220 18 C 260 28, 280 10, 300 16 L 300 44 L 0 44 Z"
              fill="url(#riskWaveGrad)"
            />
            <path
              d="M0 38 C 40 40, 70 12, 110 24 C 150 36, 180 8, 220 18 C 260 28, 280 10, 300 16"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="riskWaveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
          Multiple high-risk connections and unusual transaction patterns detected.
        </p>
      </div>

      {/* Subtabs: Summary | Key Findings | Next Steps */}
      <div className="segmented-control">
        {['Summary', 'Key Findings', 'Next Steps'].map((tab) => (
          <button
            key={tab}
            className={`segmented-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Why was this flagged? Card */}
      <div className="flagged-card">
        <h4>Why was this flagged?</h4>
        <div className="flagged-list">
          {flaggedReasons.map((reason, idx) => (
            <div
              key={idx}
              className="flagged-bullet"
              onClick={() => reason.includes('Peeling Chain') ? onNavigate(10) : onNavigate(6)}
              style={{ cursor: 'pointer' }}
            >
              <span className="flagged-dot" />
              <span style={{ textDecoration: reason.includes('Peeling Chain') ? 'underline' : 'none' }}>
                {reason}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="result-actions-row">
        <button
          className="btn-primary-blue"
          onClick={() => onNavigate(11)}
          id="btn-explore-network"
        >
          Explore Network
        </button>
        <button
          className="btn-secondary-light"
          onClick={() => onNavigate(6)}
          id="btn-view-evidence"
        >
          View Evidence
        </button>
      </div>
    </div>
  );
}
