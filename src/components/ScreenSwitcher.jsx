import React from 'react';
import { Play, RotateCcw, Smartphone, Grid, Sparkles } from 'lucide-react';

export default function ScreenSwitcher({
  currentScreen,
  onSelectScreen,
  viewMode,
  onToggleViewMode,
  isAutoTouring,
  onToggleAutoTour,
}) {
  const screens = [
    { num: 1, name: '01 Splash / Welcome' },
    { num: 2, name: '02 Home Dashboard' },
    { num: 3, name: '03 Investigate Scan' },
    { num: 4, name: '04 Analysing Pipeline' },
    { num: 5, name: '05 Investigation Result' },
    { num: 6, name: '06 Risk Analysis' },
    { num: 7, name: '07 Tx Details' },
    { num: 8, name: '08 Transaction Flow' },
    { num: 9, name: '09 Address Details' },
    { num: 10, name: '10 Detected Patterns' },
    { num: 11, name: '11 Network Graph' },
    { num: 12, name: '12 AI Investigator' },
  ];

  return (
    <>
      {/* Top Studio Workbench Header */}
      <header className="studio-header">
        <div className="studio-brand">
          <div className="studio-logo-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <circle cx="12" cy="11" r="3" fill="#60a5fa" />
            </svg>
          </div>
          <div className="studio-title-group">
            <h1>
              <span>NexChain</span>
              <span className="tag">12 Screens Live</span>
            </h1>
            <p className="studio-subtitle">Blockchain Intelligence & Forensics Platform</p>
          </div>
        </div>

        <div className="studio-controls">
          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'device' ? 'active' : ''}`}
              onClick={() => onToggleViewMode('device')}
              title="Interactive iPhone Frame"
            >
              <Smartphone size={15} />
              <span>iPhone Frame</span>
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'gallery' ? 'active' : ''}`}
              onClick={() => onToggleViewMode('gallery')}
              title="View All 12 Screens Side-by-Side"
            >
              <Grid size={15} />
              <span>All 12 Screens</span>
            </button>
          </div>

          {/* Auto Tour Flow */}
          <button
            className="quick-action-btn"
            onClick={onToggleAutoTour}
            style={{
              background: isAutoTouring ? 'rgba(16, 185, 129, 0.2)' : undefined,
              borderColor: isAutoTouring ? '#10b981' : undefined,
              color: isAutoTouring ? '#34d399' : undefined,
            }}
          >
            <Play size={14} fill={isAutoTouring ? '#10b981' : 'none'} />
            <span>{isAutoTouring ? 'Touring...' : 'Auto Tour'}</span>
          </button>

          {/* Reset to Splash */}
          <button
            className="quick-action-btn"
            onClick={() => onSelectScreen(1)}
            title="Reset to Splash Screen"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* Screen Selector Chips Bar */}
      <div className="screen-selector-bar">
        {screens.map((s) => {
          const isActive = currentScreen === s.num && viewMode === 'device';
          return (
            <button
              key={s.num}
              className={`screen-nav-chip ${isActive ? 'active' : ''}`}
              onClick={() => {
                onSelectScreen(s.num);
                if (viewMode === 'gallery') onToggleViewMode('device');
              }}
              id={`nav-screen-${s.num}`}
            >
              <span className="screen-chip-num">{s.num}</span>
              <span>{s.name.split(' ').slice(1).join(' ')}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
