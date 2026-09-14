import React, { useState, useEffect } from 'react';
import './index.css';
import './screens.css';

import DeviceFrame from './components/DeviceFrame';
import ScreenSwitcher from './components/ScreenSwitcher';
import BottomNavBar from './components/BottomNavBar';

import Screen01_Splash from './screens/Screen01_Splash';
import Screen02_Home from './screens/Screen02_Home';
import Screen03_Investigate from './screens/Screen03_Investigate';
import Screen04_Analyzing from './screens/Screen04_Analyzing';
import Screen05_Result from './screens/Screen05_Result';
import Screen06_RiskAnalysis from './screens/Screen06_RiskAnalysis';
import Screen07_TxDetails from './screens/Screen07_TxDetails';
import Screen08_TxFlow from './screens/Screen08_TxFlow';
import Screen09_AddressDetails from './screens/Screen09_AddressDetails';
import Screen10_Patterns from './screens/Screen10_Patterns';
import Screen11_NetworkGraph from './screens/Screen11_NetworkGraph';
import Screen12_AIInvestigator from './screens/Screen12_AIInvestigator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [viewMode, setViewMode] = useState('device'); // 'device' | 'gallery'
  const [isAutoTouring, setIsAutoTouring] = useState(false);
  const [queryAddress, setQueryAddress] = useState('0x7a3f...c9d2e4');

  // Auto Tour Timer
  useEffect(() => {
    let interval;
    if (isAutoTouring) {
      interval = setInterval(() => {
        setCurrentScreen((prev) => (prev >= 12 ? 1 : prev + 1));
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isAutoTouring]);

  const handleSelectScreen = (num) => {
    setIsAutoTouring(false);
    setCurrentScreen(num);
  };

  const renderScreenContent = (screenNum) => {
    switch (screenNum) {
      case 1:
        return <Screen01_Splash onNavigate={setCurrentScreen} />;
      case 2:
        return (
          <Screen02_Home 
            onNavigate={setCurrentScreen} 
            setQueryAddress={setQueryAddress} 
          />
        );
      case 3:
        return (
          <Screen03_Investigate
            onNavigate={setCurrentScreen}
            queryAddress={queryAddress}
            setQueryAddress={setQueryAddress}
          />
        );
      case 4:
        return (
          <Screen04_Analyzing 
            onNavigate={setCurrentScreen} 
            queryAddress={queryAddress} 
          />
        );
      case 5:
        return (
          <Screen05_Result 
            onNavigate={setCurrentScreen} 
            queryAddress={queryAddress} 
          />
        );
      case 6:
        return <Screen06_RiskAnalysis onNavigate={setCurrentScreen} />;
      case 7:
        return (
          <Screen07_TxDetails 
            onNavigate={setCurrentScreen} 
            queryAddress={queryAddress} 
          />
        );
      case 8:
        return <Screen08_TxFlow onNavigate={setCurrentScreen} />;
      case 9:
        return (
          <Screen09_AddressDetails 
            onNavigate={setCurrentScreen} 
            queryAddress={queryAddress} 
          />
        );
      case 10:
        return <Screen10_Patterns onNavigate={setCurrentScreen} />;
      case 11:
        return <Screen11_NetworkGraph onNavigate={setCurrentScreen} />;
      case 12:
        return <Screen12_AIInvestigator onNavigate={setCurrentScreen} />;
      default:
        return <Screen01_Splash onNavigate={setCurrentScreen} />;
    }
  };

  const screenMetadata = [
    { num: 1, title: 'Welcome / Splash', subtitle: '3D Holographic Model & Brand' },
    { num: 2, title: 'Home Dashboard', subtitle: 'Global Metrics & Recent List' },
    { num: 3, title: 'Investigate Anything', subtitle: 'Address Search & QR Scanner' },
    { num: 4, title: 'Analysing Evidence', subtitle: '8-Stage Forensic Pipeline' },
    { num: 5, title: 'Investigation Result', subtitle: 'Risk Score & Flagged Reasons' },
    { num: 6, title: 'Risk Analysis', subtitle: 'Radial Gauge & Signal Bars' },
    { num: 7, title: 'Transaction Details', subtitle: 'Confirmed TX & Block Metrics' },
    { num: 8, title: 'Transaction Flow', subtitle: 'Radial Sankey Node Ribbons' },
    { num: 9, title: 'Address Details', subtitle: 'Balance Sparkline & Analytics' },
    { num: 10, title: 'Detected Patterns', subtitle: 'Peeling Chains & Burst Activity' },
    { num: 11, title: 'Network Graph', subtitle: 'Interactive Cluster Topology' },
    { num: 12, title: 'AI Investigator', subtitle: 'Autonomous AI Forensic Chat' },
  ];

  const isNative = typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform ? window.Capacitor.isNativePlatform() : false;

  if (isNative) {
    const hasBottomNav = [2, 3, 5, 6, 11].includes(currentScreen);
    return (
      <div className="native-app-container" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
        <div
          className={`screen-viewport ${!hasBottomNav ? 'no-bottom-nav' : ''} ${currentScreen === 1 ? 'is-splash' : ''}`}
          style={{ flex: 1, paddingTop: currentScreen === 1 ? '0' : '10px' }}
        >
          {renderScreenContent(currentScreen)}
        </div>
        {hasBottomNav && (
          <BottomNavBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
        )}
      </div>
    );
  }

  return (
    <div className="app-studio">
      {/* Top Header & Screen Switcher */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={handleSelectScreen}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        isAutoTouring={isAutoTouring}
        onToggleAutoTour={() => setIsAutoTouring(!isAutoTouring)}
      />

      {/* Main Studio Viewport */}
      <main className="studio-main">
        {viewMode === 'device' ? (
          /* Single iPhone 16 Pro Frame Mode */
          <DeviceFrame
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            isScanning={currentScreen === 4}
            riskScore={72}
          >
            {renderScreenContent(currentScreen)}
          </DeviceFrame>
        ) : (
          /* All 12 Screens Side-by-Side Gallery Showcase Mode */
          <div className="gallery-grid">
            {screenMetadata.map((s) => (
              <div key={s.num} className="gallery-card">
                <div className="gallery-card-header">
                  <div className="gallery-card-badge">
                    <span className="num">{s.num}</span>
                    <span>{s.title}</span>
                  </div>
                  <button
                    className="gallery-card-action"
                    onClick={() => {
                      setCurrentScreen(s.num);
                      setViewMode('device');
                    }}
                  >
                    Interact →
                  </button>
                </div>

                <DeviceFrame
                  currentScreen={s.num}
                  onNavigate={setCurrentScreen}
                  isScanning={s.num === 4}
                  riskScore={72}
                  showBottomNav={false}
                >
                  {renderScreenContent(s.num)}
                </DeviceFrame>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
