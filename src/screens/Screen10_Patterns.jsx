import React, { useState } from 'react';
import { ArrowLeft, Share2, GitCommit, Zap, ArrowDownToLine, RefreshCw, ChevronRight, MessageSquareCode } from 'lucide-react';

export default function Screen10_Patterns({ onNavigate }) {
  const [selectedPattern, setSelectedPattern] = useState(null);

  const patterns = [
    {
      id: 'peeling-chain',
      name: 'Peeling Chain',
      score: '87%',
      desc: 'Large input → multiple smaller outputs',
      meta: '3 transactions • 4 entities',
      iconClass: 'pink',
      icon: GitCommit,
    },
    {
      id: 'burst-activity',
      name: 'Burst Activity',
      score: '79%',
      desc: '12 transactions within 4 minutes',
      meta: '12 transactions • 3 entities',
      iconClass: 'red',
      icon: Zap,
    },
    {
      id: 'consolidation',
      name: 'Consolidation',
      score: '67%',
      desc: 'Multiple wallets → 1 destination',
      meta: '8 wallets • 1 entity',
      iconClass: 'blue',
      icon: ArrowDownToLine,
    },
    {
      id: 'mixing-indicator',
      name: 'Mixing Indicator',
      score: '62%',
      desc: 'Structured transactions flow',
      meta: '5 transactions • 4 entities',
      iconClass: 'purple',
      icon: RefreshCw,
    },
  ];

  return (
    <div className="screen-patterns">
      {/* Header */}
      <div className="screen-header" style={{ padding: '0 0 6px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(5)}>
          <ArrowLeft size={18} />
        </button>
        <span className="header-title">Detected Patterns</span>
        <button className="header-icon-btn">
          <Share2 size={16} />
        </button>
      </div>

      {/* Pattern Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {patterns.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedPattern === item.id;
          return (
            <div
              key={item.id}
              className="pattern-card"
              onClick={() => setSelectedPattern(isSelected ? null : item.id)}
              style={{
                borderColor: isSelected ? '#2563eb' : 'var(--border-card)',
                background: isSelected ? '#f8fafc' : '#ffffff',
              }}
            >
              <div className={`pattern-icon-box ${item.iconClass}`}>
                <Icon size={20} />
              </div>

              <div className="pattern-details-col">
                <div className="pattern-title-row">
                  <span className="pattern-name">{item.name}</span>
                  <span className="pattern-percent-chip">{item.score}</span>
                </div>
                <div className="pattern-subtext">{item.desc}</div>
                <div className="pattern-meta-row">{item.meta}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Forensic Intelligence Assistant Banner */}
      <div
        className="ui-card"
        style={{
          background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)',
          border: '1px solid #bfdbfe',
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquareCode size={18} color="#2563eb" />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af' }}>
            Autonomous Forensic Insights
          </span>
        </div>
        <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.4 }}>
          Peeling chains typically characterize exchange-hopping or laundering rings. ChainSentinel AI mapped this cluster to known wash-trading actors.
        </p>
        <button
          className="btn-primary-blue"
          style={{ padding: '10px', fontSize: '12px' }}
          onClick={() => onNavigate(12)}
        >
          Consult AI Investigator →
        </button>
      </div>
    </div>
  );
}
