import React, { useState } from 'react';
import { ArrowLeft, Share2, Copy, Check, ArrowRight, Zap, Coins, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function Screen07_TxDetails({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const copyHash = () => {
    navigator.clipboard?.writeText('4c3a1e9f8d7b6a2c0918bcf431a');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="screen-tx-details">
      {/* Header */}
      <div className="screen-header" style={{ padding: '0 0 6px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(2)}>
          <ArrowLeft size={18} />
        </button>
        <span className="header-title">Transaction Details</span>
        <button className="header-icon-btn">
          <Share2 size={16} />
        </button>
      </div>

      {/* Main Tx Card */}
      <div className="tx-header-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="target-crypto-icon" style={{ width: 36, height: 36, fontSize: 16 }}>
              ₿
            </div>
            <span className="tx-hash-text">4c3a1e9f8d7b6a2c...</span>
          </div>
          <button
            onClick={copyHash}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
          >
            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
          </button>
        </div>

        <div className="tx-tags-row">
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="crypto-pill">Bitcoin</span>
            <span className="badge-success">Confirmed</span>
          </div>
          <span className="tx-time-stamp">Aug 16, 2026 • 09:24 AM</span>
        </div>
      </div>

      {/* 2x2 Stats Grid */}
      <div className="tx-stats-grid">
        {/* Amount */}
        <div className="tx-stat-box">
          <div className="tx-stat-title">
            <Coins size={13} color="#2563eb" />
            <span>Amount</span>
          </div>
          <div className="tx-stat-val">1.24907</div>
          <div className="tx-stat-sub">BTC ≈ $84,930</div>
        </div>

        {/* Fee */}
        <div className="tx-stat-box">
          <div className="tx-stat-title">
            <Zap size={13} color="#f59e0b" />
            <span>Fee</span>
          </div>
          <div className="tx-stat-val">241.2</div>
          <div className="tx-stat-sub">sat/vB (Priority)</div>
        </div>

        {/* Inputs */}
        <div className="tx-stat-box">
          <div className="tx-stat-title">
            <ArrowDownLeft size={13} color="#10b981" />
            <span>Inputs</span>
          </div>
          <div className="tx-stat-val">4</div>
          <div className="tx-stat-sub">2 unique clusters</div>
        </div>

        {/* Outputs */}
        <div className="tx-stat-box">
          <div className="tx-stat-title">
            <ArrowUpRight size={13} color="#ec4899" />
            <span>Outputs</span>
          </div>
          <div className="tx-stat-val">7</div>
          <div className="tx-stat-sub">1 peeling change</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="segmented-control">
        {['Overview', 'Flow', 'Raw Data'].map((tab) => (
          <button
            key={tab}
            className={`segmented-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              if (tab === 'Flow') onNavigate(8);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transaction Flow Preview Banner */}
      <div
        className="ui-card"
        onClick={() => onNavigate(8)}
        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Transaction Flow</span>
          <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: 700 }}>Interactive Flow →</span>
        </div>

        <div style={{
          background: '#f8fafc',
          border: '1px dashed #cbd5e1',
          borderRadius: '12px',
          padding: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>4 Inputs</span>
          <ArrowRight size={16} color="#94a3b8" />
          <div style={{
            padding: '6px 12px',
            background: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 800
          }}>
            TX
          </div>
          <ArrowRight size={16} color="#94a3b8" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>7 Outputs</span>
        </div>
      </div>

      {/* Bottom CTA to Radial Flow */}
      <button
        className="btn-primary-blue"
        onClick={() => onNavigate(8)}
        style={{ marginTop: 'auto' }}
      >
        Open Radial Sankey Flow
      </button>
    </div>
  );
}
