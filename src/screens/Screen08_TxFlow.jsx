import React, { useState } from 'react';
import { ArrowLeft, Share2, Camera, Maximize2, GitMerge, Filter, AlertTriangle } from 'lucide-react';

export default function Screen08_TxFlow({ onNavigate }) {
  const [activeHop, setActiveHop] = useState('2-Hop');
  const [selectedNode, setSelectedNode] = useState('Wallet A');

  return (
    <div className="screen-tx-flow">
      {/* Header */}
      <div className="screen-header" style={{ padding: '0 0 4px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(7)}>
          <ArrowLeft size={18} />
        </button>
        <span className="header-title">Transaction Flow</span>
        <button className="header-icon-btn">
          <Share2 size={16} />
        </button>
      </div>

      {/* Interactive Radial Flow Canvas Container */}
      <div className="flow-canvas-container">
        <svg width="100%" height="100%" viewBox="0 0 360 380" style={{ overflow: 'visible' }}>
          {/* Background grid dots */}
          <pattern id="flowGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#e2e8f0" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#flowGrid)" />

          {/* Flow Ribbons (Curved Beziers with gradients) */}
          <defs>
            <linearGradient id="gradRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Central Hub: (180, 190) */}
          {/* Curve to Wallet A: Top (180, 50) */}
          <path d="M 180 190 C 180 120, 180 100, 180 60" stroke="url(#gradRed)" strokeWidth="6" fill="none" strokeLinecap="round" />
          {/* Curve to Wallet B: Top-Right (290, 100) */}
          <path d="M 180 190 C 230 190, 260 140, 290 100" stroke="url(#gradCyan)" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Curve to Wallet D: Bottom-Right (280, 290) */}
          <path d="M 180 190 C 230 190, 250 250, 280 290" stroke="url(#gradPurple)" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Curve to Wallet C: Bottom-Left (80, 290) */}
          <path d="M 180 190 C 130 190, 110 250, 80 290" stroke="url(#gradCyan)" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* Curve to Exchange: Left (70, 130) */}
          <path d="M 180 190 C 120 190, 90 160, 70 130" stroke="url(#gradOrange)" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Nodes */}
          {/* Center TX Node */}
          <g transform="translate(180, 190)" style={{ cursor: 'pointer' }}>
            <circle r="36" fill="#ffffff" stroke="#2563eb" strokeWidth="3" filter="drop-shadow(0 6px 12px rgba(37,99,235,0.25))" />
            <text textAnchor="middle" y="-6" fontSize="12" fontWeight="800" fill="#0f172a">TX</text>
            <text textAnchor="middle" y="12" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700" fill="#2563eb">4c3a...6a2c</text>
          </g>

          {/* Wallet A (Top - High Risk) */}
          <g
            transform="translate(180, 50)"
            onClick={() => onNavigate(9)}
            style={{ cursor: 'pointer' }}
          >
            <circle r="28" fill="#ffffff" stroke="#ef4444" strokeWidth="2.5" filter="drop-shadow(0 6px 12px rgba(239,68,68,0.25))" />
            <circle cx="16" cy="-16" r="10" fill="#ef4444" />
            <text x="16" y="-12" textAnchor="middle" fontSize="11" fill="white" fontWeight="900">!</text>
            <text textAnchor="middle" y="-2" fontSize="10" fontWeight="800" fill="#0f172a">Wallet A</text>
            <text textAnchor="middle" y="12" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" fill="#ef4444">0x7a3f...d2e4</text>
          </g>

          {/* Wallet B (Top Right - Ethereum) */}
          <g
            transform="translate(290, 100)"
            onClick={() => onNavigate(9)}
            style={{ cursor: 'pointer' }}
          >
            <circle r="28" fill="#ffffff" stroke="#06b6d4" strokeWidth="2.5" filter="drop-shadow(0 4px 8px rgba(6,182,212,0.2))" />
            <text textAnchor="middle" y="-2" fontSize="10" fontWeight="800" fill="#0f172a">Wallet B</text>
            <text textAnchor="middle" y="12" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" fill="#0284c7">0x9d4...7b1c</text>
          </g>

          {/* Wallet D (Bottom Right) */}
          <g
            transform="translate(280, 290)"
            onClick={() => onNavigate(9)}
            style={{ cursor: 'pointer' }}
          >
            <circle r="28" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2.5" filter="drop-shadow(0 4px 8px rgba(139,92,246,0.2))" />
            <text textAnchor="middle" y="-2" fontSize="10" fontWeight="800" fill="#0f172a">Wallet D</text>
            <text textAnchor="middle" y="12" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" fill="#7c3aed">0x7c1...e0a4</text>
          </g>

          {/* Wallet C (Bottom Left) */}
          <g
            transform="translate(80, 290)"
            onClick={() => onNavigate(9)}
            style={{ cursor: 'pointer' }}
          >
            <circle r="28" fill="#ffffff" stroke="#06b6d4" strokeWidth="2.5" filter="drop-shadow(0 4px 8px rgba(6,182,212,0.2))" />
            <text textAnchor="middle" y="-2" fontSize="10" fontWeight="800" fill="#0f172a">Wallet C</text>
            <text textAnchor="middle" y="12" fontSize="8.5" fontFamily="var(--font-mono)" fontWeight="700" fill="#0284c7">0x2a1...9c3f</text>
          </g>

          {/* Exchange Node (Left) */}
          <g transform="translate(70, 130)" style={{ cursor: 'pointer' }}>
            <circle r="28" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.5" filter="drop-shadow(0 4px 8px rgba(245,158,11,0.2))" />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="800" fill="#d97706">Exchange</text>
          </g>
        </svg>

        {/* Pink Floating Camera Snapshot Button */}
        <button
          className="flow-camera-btn"
          title="Export Graph Snapshot"
          onClick={() => alert("Flow Snapshot captured and saved to case evidence!")}
        >
          <Camera size={20} />
        </button>
      </div>

      {/* Flow Legend */}
      <div className="flow-legend-row">
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} /> High Risk
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} /> Suspicious
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06b6d4' }} /> Normal
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }} /> Unknown
        </span>
      </div>

      {/* Bottom Controls: Expand / 2-Hop / Filter */}
      <div className="flow-controls-row">
        <button className="btn-flow-control">
          <Maximize2 size={14} />
          <span>Expand</span>
        </button>
        <button
          className="btn-flow-control"
          style={{ background: '#eff6ff', borderColor: '#bfdbfe', color: '#2563eb' }}
        >
          <GitMerge size={14} />
          <span>2-Hop</span>
        </button>
        <button className="btn-flow-control">
          <Filter size={14} />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
}
