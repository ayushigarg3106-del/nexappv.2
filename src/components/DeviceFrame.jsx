import React from 'react';
import { Wifi, Battery } from 'lucide-react';
import DynamicIsland from './DynamicIsland';
import BottomNavBar from './BottomNavBar';

export default function DeviceFrame({
  currentScreen,
  onNavigate,
  children,
  isScanning = false,
  riskScore = 72,
  showBottomNav = true,
}) {
  // Check if current screen has dark background (Splash screen 1 or Network graph 11)
  const isLightText = currentScreen === 1 || currentScreen === 11;
  const isSplash = currentScreen === 1;

  // Screens that show bottom nav: 2 (Home), 3 (Investigate), 5 (Reports), 6 (Risk Analysis), 11 (Network Graph)
  const hasBottomNav = showBottomNav && [2, 3, 5, 6, 11].includes(currentScreen);

  return (
    <div className="iphone-chassis">
      <div className="iphone-screen">
        {/* Status Bar */}
        <div className="status-bar-container">
          <div className={`status-time ${isLightText ? 'light-text' : ''}`}>
            9:41
          </div>

          <DynamicIsland
            currentScreen={currentScreen}
            isScanning={isScanning}
            riskScore={riskScore}
          />

          <div className={`status-icons ${isLightText ? 'light-text' : ''}`}>
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="8" width="3" height="3" rx="0.5" />
              <rect x="4.5" y="5.5" width="3" height="5.5" rx="0.5" />
              <rect x="9" y="3" width="3" height="8" rx="0.5" />
              <rect x="13.5" y="0.5" width="3" height="10.5" rx="0.5" />
            </svg>
            <Wifi size={14} strokeWidth={2.5} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <div style={{
                width: '22px',
                height: '11px',
                border: '1px solid currentColor',
                borderRadius: '3.5px',
                padding: '1.5px',
                display: 'flex'
              }}>
                <div style={{ width: '85%', height: '100%', background: 'currentColor', borderRadius: '1.5px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Viewport for current Screen */}
        <div className={`screen-viewport ${!hasBottomNav ? 'no-bottom-nav' : ''} ${isSplash ? 'is-splash' : ''}`}>
          {children}
        </div>

        {/* Bottom Navigation if applicable */}
        {hasBottomNav && (
          <BottomNavBar currentScreen={currentScreen} onNavigate={onNavigate} />
        )}

        {/* iPhone Home Indicator Pill */}
        <div className={`iphone-home-indicator ${isLightText ? 'light' : ''}`} />
      </div>
    </div>
  );
}
