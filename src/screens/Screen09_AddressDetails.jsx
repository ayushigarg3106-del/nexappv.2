import React, { useState } from 'react';
import { ArrowLeft, Clock, TrendingUp, ExternalLink, BookmarkPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Screen09_AddressDetails({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [addedToCase, setAddedToCase] = useState(false);

  const handleAddCase = () => {
    setAddedToCase(true);
    try {
      confetti({ particleCount: 40, spread: 50 });
    } catch (_) {}
    setTimeout(() => setAddedToCase(false), 2500);
  };

  return (
    <div className="screen-address-details">
      {/* Header */}
      <div className="screen-header" style={{ padding: '0 0 6px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(5)}>
          <ArrowLeft size={18} />
        </button>
        <span className="header-title">Address Details</span>
        <button className="header-icon-btn">
          <Clock size={16} />
        </button>
      </div>

      {/* Address Hero Card */}
      <div className="address-hero-card">
        <div className="address-eth-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 4 13 12 18 20 13 12 2" />
            <polygon points="12 18 4 13 12 22 20 13 12 18" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
            0x7a3f...c9d2e4
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="crypto-pill">Externally Owned Account</span>
            <span className="badge-success">Active</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="segmented-control">
        {['Overview', 'Transactions', 'Analytics', 'NFTs'].map((tab) => (
          <button
            key={tab}
            className={`segmented-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Balance Card with Sparkline */}
      <div className="address-balance-card">
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Balance</div>
        <div className="balance-amount">$1,245,320.18</div>
        <div className="balance-sub-trend">
          <span>12.45 BTC</span>
          <TrendingUp size={14} />
          <span>12.4% (30D)</span>
        </div>

        {/* Green Glowing Sparkline */}
        <div className="balance-sparkline">
          <svg width="100%" height="48" viewBox="0 0 300 48" fill="none" preserveAspectRatio="none">
            <path
              d="M0 40 Q 40 35, 70 28 T 140 32 T 200 15 T 260 22 T 300 8"
              stroke="#10b981"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0 40 Q 40 35, 70 28 T 140 32 T 200 15 T 260 22 T 300 8 L 300 48 L 0 48 Z"
              fill="url(#greenSparkGrad)"
            />
            <defs>
              <linearGradient id="greenSparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 4 Stats Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div className="ui-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Transactions</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>243</div>
        </div>
        <div className="ui-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Unique Counterparties</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>47</div>
        </div>
        <div className="ui-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Unique IPs</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: 2 }}>12</div>
        </div>
        <div className="ui-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>First Seen</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>Jan 12, 2023</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
        <button
          className="btn-primary-blue"
          onClick={() => window.open('https://mempool.space', '_blank')}
        >
          View on Explorer
        </button>
        <button
          className="btn-secondary-light"
          onClick={handleAddCase}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <BookmarkPlus size={16} color={addedToCase ? '#10b981' : '#2563eb'} />
          <span>{addedToCase ? 'Added to Case ✓' : 'Add to Case'}</span>
        </button>
      </div>

      {/* Pattern banner link */}
      <button
        onClick={() => onNavigate(10)}
        style={{
          background: 'none',
          border: 'none',
          color: '#2563eb',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
          textAlign: 'center'
        }}
      >
        View 4 Detected Patterns for this address →
      </button>
    </div>
  );
}
