import React, { useState } from 'react';
import { ShieldAlert, Activity, CheckCircle2, Search } from 'lucide-react';

export default function DynamicIsland({ currentScreen, isScanning, riskScore = 72 }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  // Derive dynamic island state from current screen
  let stateTitle = "NexChain";
  let stateSub = "Intelligence Active";
  let showPulse = true;
  let isDanger = false;

  if (currentScreen === 4 || isScanning) {
    stateTitle = "Forensics Engine";
    stateSub = "Tracing 8,421 nodes...";
    showPulse = true;
  } else if (currentScreen === 5 || currentScreen === 6) {
    stateTitle = "Alert Flagged";
    stateSub = `High Risk: ${riskScore}/100`;
    isDanger = true;
  } else if (currentScreen === 8 || currentScreen === 11) {
    stateTitle = "Network Graph";
    stateSub = "Cluster 3 Active";
  } else if (currentScreen === 12) {
    stateTitle = "AI Agent";
    stateSub = "Synthesizing Report...";
  }

  return (
    <div className="dynamic-island-wrapper" onClick={toggleExpand} title="Click to toggle Dynamic Island">
      <div className={`dynamic-island ${expanded ? 'expanded' : ''}`}>
        {!expanded ? (
          <>
            <div className="island-sensor-dot" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {isDanger ? (
                <ShieldAlert size={12} color="#ef4444" />
              ) : currentScreen === 4 ? (
                <Activity size={12} color="#06b6d4" className="animate-spin-slow" />
              ) : (
                <div className={`island-pulse-indicator ${isDanger ? 'danger' : ''}`} />
              )}
              <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '-0.2px' }}>
                {isDanger ? '72 High' : currentScreen === 4 ? '58%' : 'Sentinel'}
              </span>
            </div>
          </>
        ) : (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: isDanger ? 'rgba(239, 68, 68, 0.2)' : 'rgba(37, 99, 235, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: isDanger ? '1px solid #ef4444' : '1px solid #3b82f6'
              }}>
                {isDanger ? <ShieldAlert size={20} color="#ef4444" /> : <Activity size={20} color="#38bdf8" />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>{stateTitle}</span>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>{stateSub}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '4px 8px',
                borderRadius: '12px',
                background: isDanger ? '#ef4444' : '#2563eb',
                color: 'white'
              }}>
                LIVE
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
