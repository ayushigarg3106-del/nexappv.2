import React, { useState } from 'react';
import { ArrowLeft, Share2, ZoomIn, ZoomOut, Compass, Layers, RotateCcw } from 'lucide-react';

export default function Screen11_NetworkGraph({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  const filters = ['All', 'Wallets', 'Transactions', 'IPs'];

  const nodes = [
    { id: 'center', label: 'BTC Core', type: 'center', x: 180, y: 170, color: '#f7931a', radius: 24 },
    { id: 'n1', label: '0x7a3f...d2e4', type: 'wallet', risk: 'high', x: 270, y: 110, color: '#ef4444', radius: 16 },
    { id: 'n2', label: '4c3a...6a2c', type: 'tx', risk: 'suspicious', x: 90, y: 120, color: '#f59e0b', radius: 15 },
    { id: 'n3', label: 'Binance Pool', type: 'exchange', risk: 'normal', x: 190, y: 60, color: '#3b82f6', radius: 18 },
    { id: 'n4', label: 'Dark Cluster #3', type: 'wallet', risk: 'high', x: 100, y: 240, color: '#ef4444', radius: 16 },
    { id: 'n5', label: '0x2a1...9c3f', type: 'wallet', risk: 'normal', x: 260, y: 250, color: '#06b6d4', radius: 15 },
    { id: 'n6', label: '192.168.1.1', type: 'ip', risk: 'unknown', x: 290, y: 190, color: '#94a3b8', radius: 13 },
    { id: 'n7', label: 'Coinbase OTC', type: 'exchange', risk: 'normal', x: 70, y: 180, color: '#3b82f6', radius: 15 },
  ];

  const edges = [
    { from: 'center', to: 'n1', color: '#ef4444' },
    { from: 'center', to: 'n2', color: '#f59e0b' },
    { from: 'center', to: 'n3', color: '#3b82f6' },
    { from: 'center', to: 'n4', color: '#ef4444' },
    { from: 'center', to: 'n5', color: '#06b6d4' },
    { from: 'n1', to: 'n6', color: '#94a3b8' },
    { from: 'n2', to: 'n7', color: '#3b82f6' },
  ];

  const handleZoom = (delta) => {
    setZoomLevel((prev) => Math.max(0.7, Math.min(1.8, prev + delta)));
  };

  return (
    <div className="screen-network-graph">
      {/* Header */}
      <div className="screen-header" style={{ padding: '0 0 4px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(5)}>
          <ArrowLeft size={18} />
        </button>
        <span className="header-title">Network Graph</span>
        <button className="header-icon-btn">
          <Share2 size={16} />
        </button>
      </div>

      {/* Filter Pills */}
      <div className="segmented-control" style={{ padding: '3px' }}>
        {filters.map((f) => (
          <button
            key={f}
            className={`segmented-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Network Graph Interactive Canvas */}
      <div className="network-graph-viewport">
        {/* Floating Controls */}
        <div className="network-toolbox">
          <button className="network-tool-btn" onClick={() => handleZoom(0.15)} title="Zoom In">
            <ZoomIn size={16} />
          </button>
          <button className="network-tool-btn" onClick={() => handleZoom(-0.15)} title="Zoom Out">
            <ZoomOut size={16} />
          </button>
          <button className="network-tool-btn" onClick={() => setZoomLevel(1)} title="Recenter">
            <Compass size={16} />
          </button>
          <button className="network-tool-btn" onClick={() => onNavigate(8)} title="View Tx Flow">
            <Layers size={16} />
          </button>
        </div>

        {/* SVG Network Graph */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 360 320"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.25s ease'
          }}
        >
          {/* Subtle Cyber Grid */}
          <pattern id="netGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#e2e8f0" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#netGrid)" />

          {/* Edges */}
          {edges.map((e, idx) => {
            const fNode = nodes.find((n) => n.id === e.from);
            const tNode = nodes.find((n) => n.id === e.to);
            if (!fNode || !tNode) return null;
            return (
              <line
                key={idx}
                x1={fNode.x}
                y1={fNode.y}
                x2={tNode.x}
                y2={tNode.y}
                stroke={e.color}
                strokeWidth="2.5"
                strokeOpacity="0.6"
                strokeDasharray={e.from === 'n1' ? '4 3' : 'none'}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => {
                  setSelectedNode(node.id);
                  if (node.id === 'n1') onNavigate(9);
                }}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow ring on hover/selection */}
                <circle
                  r={node.radius + 6}
                  fill={node.color}
                  opacity={isSelected ? 0.35 : 0.12}
                  className="animate-pulse"
                />
                <circle
                  r={node.radius}
                  fill="#ffffff"
                  stroke={node.color}
                  strokeWidth="2.5"
                  filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
                />
                {node.id === 'center' ? (
                  <text textAnchor="middle" y="5" fontSize="14" fontWeight="900" fill="#f7931a">₿</text>
                ) : (
                  <circle r={node.radius - 6} fill={node.color} opacity="0.8" />
                )}

                {/* Node Tag */}
                <text
                  textAnchor="middle"
                  y={node.radius + 13}
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                  fill="#0f172a"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Drawer Hint */}
        {selectedNode && (
          <div style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '8px 12px',
            border: '1px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px'
          }}>
            <span>Selected: <b>{nodes.find(n => n.id === selectedNode)?.label}</b></span>
            <button
              onClick={() => onNavigate(9)}
              style={{
                border: 'none',
                background: '#2563eb',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Inspect →
            </button>
          </div>
        )}
      </div>

      {/* Footer Metrics Status Bar */}
      <div className="network-footer-stats">
        <div className="net-stat-item">
          <span className="net-stat-val">47</span>
          <span className="net-stat-lbl">Entities</span>
        </div>
        <div className="net-stat-item">
          <span className="net-stat-val">3</span>
          <span className="net-stat-lbl">Clusters</span>
        </div>
        <div className="net-stat-item">
          <span className="net-stat-val" style={{ color: '#ef4444' }}>1</span>
          <span className="net-stat-lbl">High Risk</span>
        </div>
        <div className="net-stat-item">
          <span className="net-stat-val" style={{ color: '#2563eb' }}>2</span>
          <span className="net-stat-lbl">Exchanges</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flow-legend-row" style={{ padding: '0 4px' }}>
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
    </div>
  );
}
