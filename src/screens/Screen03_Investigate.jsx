import React, { useState } from 'react';
import { ArrowLeft, Target, Clipboard, QrCode, ArrowRight, Clock, ShieldAlert } from 'lucide-react';

export default function Screen03_Investigate({ onNavigate, setQueryAddress }) {
  const [activeTab, setActiveTab] = useState('Paste');
  const [inputVal, setInputVal] = useState('0x7a3f...c9d2e4');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInputVal(text);
    } catch {
      setInputVal('0x7a3fc894726e9c9d2e4b0113f89');
    }
  };

  const handleAnalyze = () => {
    if (setQueryAddress) setQueryAddress(inputVal);
    onNavigate(4); // Go to Analyzing Evidence pipeline screen
  };

  return (
    <div className="screen-investigate">
      {/* Screen Header */}
      <div className="screen-header" style={{ padding: '0 0 10px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(2)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Target size={18} color="#2563eb" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Investigate</span>
        </div>
        <div style={{ width: 38 }} />
      </div>

      {/* Main Title Area */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>Investigate Anything</h2>
        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
          Wallet • TxID • IP • Domain • QR
        </p>
      </div>

      {/* Segmented Mode Selector: Paste / Scan / Upload */}
      <div className="investigate-tabs">
        {['Paste', 'Scan', 'Upload'].map((tab) => (
          <button
            key={tab}
            className={`investigate-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Input Field with Paste action */}
      <div className="investigate-input-box">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Paste address, TxID, IP or domain..."
          id="investigate-search-input"
        />
        <button
          onClick={handlePaste}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
          title="Paste from clipboard"
        >
          <Clipboard size={18} />
        </button>
      </div>

      {/* Analyze Button */}
      <button className="btn-analyze-gradient" onClick={handleAnalyze} id="btn-analyze-submit">
        <span>Analyze</span>
        <ArrowRight size={18} strokeWidth={2.5} />
      </button>

      {/* Or scan QR code banner */}
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>
        Or scan QR code
      </div>

      {/* Holographic QR Scanner Card */}
      <div className="qr-scanner-card" onClick={handleAnalyze}>
        <div className="qr-3d-graphic">
          <div className="qr-laser-line" />
          <QrCode size={58} color="#4338ca" strokeWidth={1.5} />
        </div>
        <div className="qr-scanner-label">Tap to Scan</div>
      </div>

      {/* Recent Searches */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
          Recent Searches
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { target: '0x7a3f...c9d2e4', time: '2 min ago' },
            { target: '4c3a1e9f...6a2c', time: '12 min ago' },
            { target: '192.168.1.1', time: '1 hour ago' },
          ].map((s, idx) => (
            <div
              key={idx}
              onClick={() => { setInputVal(s.target); handleAnalyze(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={15} color="#94a3b8" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>
                  {s.target}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{s.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
