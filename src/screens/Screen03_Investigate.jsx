import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Target, 
  Clipboard, 
  QrCode, 
  ArrowRight, 
  Clock, 
  Search, 
  X, 
  Trash2, 
  ShieldAlert, 
  Zap, 
  Globe, 
  Link as LinkIcon, 
  FolderKanban, 
  ExternalLink,
  Camera,
  Activity,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Screen03_Investigate({ onNavigate, queryAddress, setQueryAddress }) {
  const [activeTab, setActiveTab] = useState('Search'); // 'Search' | 'QR Scan' | 'History'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inputVal, setInputVal] = useState(queryAddress || '0x7a3fc894726e9c9d2e4b0113f89');
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Sync if queryAddress prop changes
  useEffect(() => {
    if (queryAddress) {
      setInputVal(queryAddress);
    }
  }, [queryAddress]);

  // Mandatory Search History backed by localStorage
  const defaultHistory = [
    { target: '0x7a3fc894726e9c9d2e4b0113f89', type: 'Ethereum Mixer', time: 'Just now', risk: 'Critical 98%' },
    { target: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', type: 'Bitcoin Storage', time: '14 min ago', risk: 'Tier 4 Watch' },
    { target: '0x4c3a1e9f2b8d0c1e5a7b9d3f6a2c8e4b1d0f5e9a', type: 'Ronin Exploit Tx', time: '42 min ago', risk: 'Exploit Tx' },
    { target: '185.220.101.5', type: 'Tor Exit Node', time: '2 hours ago', risk: 'High Anonymity' },
  ];

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('nexchain_search_history');
      return saved ? JSON.parse(saved) : defaultHistory;
    } catch {
      return defaultHistory;
    }
  });

  // Save history to localStorage
  const saveSearchToHistory = (query, detectedInfo) => {
    if (!query || query.trim().length < 4) return;
    const newEntry = {
      target: query.trim(),
      type: detectedInfo?.type || 'Forensic Query',
      time: 'Just now',
      risk: detectedInfo?.risk || 'Audited'
    };

    const updated = [newEntry, ...history.filter(h => h.target.toLowerCase() !== query.trim().toLowerCase())].slice(0, 15);
    setHistory(updated);
    try {
      localStorage.setItem('nexchain_search_history', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('nexchain_search_history');
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteHistoryItem = (e, index) => {
    e.stopPropagation();
    const updated = history.filter((_, idx) => idx !== index);
    setHistory(updated);
    try {
      localStorage.setItem('nexchain_search_history', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Live Forensic Entity Auto-Detection Engine
  const detectEntityType = (query) => {
    const trimmed = (query || '').trim();
    if (!trimmed) return null;

    // 1. Transaction Hash (TxID) - 64 hex chars
    if (/^(0x)?[a-fA-F0-9]{64}$/.test(trimmed)) {
      return {
        type: 'Transaction Hash (TxID)',
        network: 'EVM / Bitcoin Hex Digest',
        color: '#3b82f6',
        bg: '#eff6ff',
        icon: '🔗',
        risk: 'Suspicious Velocity Flagged',
        riskLevel: 'warning',
        primaryActionLabel: 'Trace Tx Flow (Sankey)',
        primaryScreen: 8,
        secondaryScreen: 7
      };
    }

    // 2. Ethereum / EVM Address
    if (/^0x[a-fA-F0-9]{40}$/.test(trimmed) || /^0x[a-fA-F0-9]{8,38}\.\.\./.test(trimmed)) {
      const isMixer = trimmed.toLowerCase().includes('7a3f') || trimmed.toLowerCase().includes('0x7a');
      return {
        type: 'Ethereum / EVM Address',
        network: 'Ethereum Mainnet (ERC-20)',
        color: '#8b5cf6',
        bg: '#f5f3ff',
        icon: '⚡',
        risk: isMixer ? 'OFAC Sanctioned Mixer' : 'Monitored Counterparty',
        riskLevel: isMixer ? 'critical' : 'warning',
        primaryActionLabel: 'Forensic Risk Audit',
        primaryScreen: 4,
        secondaryScreen: 9
      };
    }

    // 3. Bitcoin (BTC) Address
    if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(trimmed)) {
      const isSilkRoad = trimmed.toLowerCase().includes('bc1qxy');
      return {
        type: 'Bitcoin (BTC) Address',
        network: 'Bitcoin UTXO Ledger (Mainnet)',
        color: '#f59e0b',
        bg: '#fffbeb',
        icon: '₿',
        risk: isSilkRoad ? 'DOJ / FBI Seized Cold Storage' : 'Active UTXO Cluster',
        riskLevel: isSilkRoad ? 'high' : 'safe',
        primaryActionLabel: 'UTXO Peeling Analysis',
        primaryScreen: 4,
        secondaryScreen: 9
      };
    }

    // 4. Host IP / VPN / Node Cluster
    if (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(trimmed)) {
      return {
        type: 'Host IP / Node Cluster',
        network: 'Bulletproof P2P Tor Relay',
        color: '#ef4444',
        bg: '#fef2f2',
        icon: '🌐',
        risk: 'High Anonymity Relay Host',
        riskLevel: 'critical',
        primaryActionLabel: 'Inspect Network Topology',
        primaryScreen: 11,
        secondaryScreen: 4
      };
    }

    // 5. Web3 / ENS Domain
    if (/\.(eth|sol|crypto|bit|xyz|onion|org|io)$/i.test(trimmed)) {
      return {
        type: 'Web3 / ENS Domain',
        network: 'Decentralized Domain Service',
        color: '#06b6d4',
        bg: '#ecfeff',
        icon: '🏷️',
        risk: 'Phishing Impersonation Target',
        riskLevel: 'warning',
        primaryActionLabel: 'Domain Attribution',
        primaryScreen: 4,
        secondaryScreen: 11
      };
    }

    // 6. Case File / Warrant ID
    if (/^(CASE|NX|OFAC)-/i.test(trimmed)) {
      return {
        type: 'Forensic Case Record',
        network: 'NexChain Law Enforcement Ledger',
        color: '#6366f1',
        bg: '#eef2ff',
        icon: '📁',
        risk: 'Active Court Warrant',
        riskLevel: 'critical',
        primaryActionLabel: 'Open Case Dossier',
        primaryScreen: 10,
        secondaryScreen: 5
      };
    }

    // Fallback Generic Query
    return {
      type: 'Multi-Chain Entity',
      network: 'Global Blockchain Forensic Index',
      color: '#64748b',
      bg: '#f8fafc',
      icon: '🔍',
      risk: 'Signature Verification Required',
      riskLevel: 'unknown',
      primaryActionLabel: 'Full Forensic Pipeline',
      primaryScreen: 4,
      secondaryScreen: 5
    };
  };

  const detectedEntity = detectEntityType(inputVal);

  // Mandatory Categories
  const categories = ['All', 'Wallets', 'TxID', 'Nodes / IP', 'Domains', 'Sanctioned'];

  // Verified Forensic Preset Targets
  const forensicPresets = [
    {
      name: 'Tornado Cash Mixer Outflow',
      query: '0x7a3fc894726e9c9d2e4b0113f89',
      category: 'Wallets',
      chain: 'Ethereum',
      icon: '⚡',
      risk: '98/100 Risk',
      riskClass: 'detector-risk-pill critical',
      note: 'OFAC Sanctioned Smart Contract'
    },
    {
      name: 'Silk Road Seized Reserve',
      query: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      category: 'Wallets',
      chain: 'Bitcoin',
      icon: '₿',
      risk: 'Tier 4 Watch',
      riskClass: 'detector-risk-pill high',
      note: 'US Marshals Seized Cold Storage'
    },
    {
      name: 'Ronin Bridge Exploit Transfer',
      query: '0x4c3a1e9f2b8d0c1e5a7b9d3f6a2c8e4b1d0f5e9a',
      category: 'TxID',
      chain: 'Ethereum',
      icon: '🔗',
      risk: '$624M Stolen',
      riskClass: 'detector-risk-pill critical',
      note: 'Lazarus Group Bridge Exploit Hash'
    },
    {
      name: 'Bulletproof VPN Relay Node',
      query: '185.220.101.5',
      category: 'Nodes / IP',
      chain: 'Tor / VPN',
      icon: '🌐',
      risk: 'Anonymizer',
      riskClass: 'detector-risk-pill warning',
      note: 'Darknet Gateway Mixer Relay'
    },
    {
      name: 'Lazarus Phishing Drainer ENS',
      query: 'lazarus-drainer.eth',
      category: 'Domains',
      chain: 'ENS / Web3',
      icon: '🏷️',
      risk: 'Malicious',
      riskClass: 'detector-risk-pill critical',
      note: 'Fake AirDrop Signature Drainer'
    },
    {
      name: 'OFAC Cyber Recovery Docket',
      query: 'CASE-2024-0982-NX',
      category: 'Sanctioned',
      chain: 'Case File',
      icon: '📁',
      risk: 'Active Warrant',
      riskClass: 'detector-risk-pill critical',
      note: 'Cross-Border Asset Recovery Docket'
    }
  ];

  const filteredPresets = selectedCategory === 'All' 
    ? forensicPresets 
    : forensicPresets.filter(p => p.category === selectedCategory);

  // Paste action
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.trim()) {
        setInputVal(text.trim());
        return;
      }
    } catch {
      // ignore
    }
    // Fallback sample if clipboard permission is denied in emulator
    setInputVal('0x7a3fc894726e9c9d2e4b0113f89');
  };

  // Analyze action
  const handleAnalyze = (targetQuery, screenOverride) => {
    const finalTarget = (targetQuery || inputVal || '').trim();
    if (!finalTarget) return;

    if (setQueryAddress) {
      setQueryAddress(finalTarget);
    }

    const info = detectEntityType(finalTarget);
    saveSearchToHistory(finalTarget, info);

    if (screenOverride) {
      onNavigate(screenOverride);
    } else {
      onNavigate(4); // Run 8-stage forensic pipeline screen
    }
  };

  // Mock QR Scanner Simulation
  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      const scannedBtc = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
      setInputVal(scannedBtc);
      try {
        confetti({ particleCount: 35, spread: 60 });
      } catch (_) {}
      setTimeout(() => {
        setScanSuccess(false);
        handleAnalyze(scannedBtc, 4);
      }, 900);
    }, 1400);
  };

  return (
    <div className="screen-investigate">
      {/* Screen Header */}
      <div className="screen-header" style={{ padding: '0 0 8px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(2)} title="Back to Home">
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Search size={18} color="#2563eb" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Forensic Search Hub</span>
        </div>
        <button 
          className="header-icon-btn" 
          onClick={() => setActiveTab(activeTab === 'QR Scan' ? 'Search' : 'QR Scan')}
          title="Toggle QR Camera"
        >
          <QrCode size={17} color={activeTab === 'QR Scan' ? '#2563eb' : '#64748b'} />
        </button>
      </div>

      {/* Screen Mode Tabs */}
      <div className="investigate-tabs">
        {['Search', 'QR Scan', 'History'].map((tab) => (
          <button
            key={tab}
            className={`investigate-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'Search' && '🔍 Search'}
            {tab === 'QR Scan' && '📷 QR Scanner'}
            {tab === 'History' && `⏱️ History (${history.length})`}
          </button>
        ))}
      </div>

      {/* TAB 1: SEARCH / INPUT VIEW */}
      {activeTab === 'Search' && (
        <>
          {/* Search Input Box */}
          <div className="investigate-input-box">
            <Search size={18} color="#64748b" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter Wallet, TxID, IP, ENS or Domain..."
              id="investigate-search-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAnalyze();
                }
              }}
            />
            {inputVal.length > 0 && (
              <button
                onClick={() => setInputVal('')}
                className="home-search-clear-btn"
                title="Clear input"
              >
                <X size={15} />
              </button>
            )}
            <button
              onClick={handlePaste}
              style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
              title="Paste from clipboard"
            >
              <Clipboard size={18} />
            </button>
          </div>

          {/* Real-Time Auto-Detection Card */}
          {detectedEntity && (
            <div className="investigate-entity-detector">
              <div className="detector-top-row">
                <div className="detector-type-badge">
                  <span className="detector-type-icon">{detectedEntity.icon}</span>
                  <span>{detectedEntity.type}</span>
                </div>
                <span className={`detector-risk-pill ${detectedEntity.riskLevel}`}>
                  {detectedEntity.risk}
                </span>
              </div>

              <div className="detector-meta-row">
                <span>Protocol: <strong>{detectedEntity.network}</strong></span>
                <span>Verification: <strong>Active Ledger</strong></span>
              </div>

              {/* Direct Quick Action Routing */}
              <div className="detector-shortcuts">
                <button 
                  className="detector-shortcut-btn"
                  onClick={() => handleAnalyze(inputVal, detectedEntity.primaryScreen)}
                  title="Direct Action"
                >
                  <Activity size={13} color="#2563eb" />
                  <span>{detectedEntity.primaryActionLabel}</span>
                </button>
                <button 
                  className="detector-shortcut-btn"
                  onClick={() => handleAnalyze(inputVal, detectedEntity.secondaryScreen)}
                  title="Secondary View"
                >
                  <ExternalLink size={13} color="#64748b" />
                  <span>Detailed View</span>
                </button>
              </div>
            </div>
          )}

          {/* Primary Analyze Gradient Button */}
          <button 
            className="btn-analyze-gradient" 
            onClick={() => handleAnalyze()} 
            id="btn-analyze-submit"
          >
            <span>Run 8-Stage Forensic Analysis</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>

          {/* Mandatory Search Category Filter Chips */}
          <div style={{ marginTop: '2px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '8px' }}>
              Filter by Target Entity
            </div>
            <div className="investigate-filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`investigate-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Curated Forensic Target Presets Grid */}
          <div className="investigate-presets-section">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
                Verified Forensic Presets ({filteredPresets.length})
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>1-Tap Analyze</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredPresets.map((preset, idx) => (
                <div
                  key={idx}
                  className="investigate-preset-card"
                  onClick={() => {
                    setInputVal(preset.query);
                    handleAnalyze(preset.query);
                  }}
                  title={`Analyze ${preset.name}`}
                >
                  <div className="preset-left-info">
                    <div className="preset-icon-circle">
                      {preset.icon}
                    </div>
                    <div className="preset-text-col">
                      <div className="preset-title-text">{preset.name}</div>
                      <div className="preset-hash-mono">{preset.query}</div>
                      <div className="preset-note-sub">{preset.note}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span className={preset.riskClass}>{preset.risk}</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{preset.chain}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* TAB 2: QR SCANNER VIEW */}
      {activeTab === 'QR Scan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="investigate-scanner-viewfinder">
            <div className="scanner-frame-box">
              {isScanning && <div className="scanner-laser-sweep" />}
              {scanSuccess ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                  <CheckCircle2 size={54} color="#10b981" />
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>QR Code Verified!</span>
                </div>
              ) : (
                <QrCode size={90} color={isScanning ? '#6366f1' : '#475569'} strokeWidth={1.2} />
              )}
            </div>

            <div className="scanner-tap-hint">
              Align cold wallet QR code, paper seed address, or Tx voucher within frame.
            </div>

            <button 
              className="btn-scan-trigger-mock"
              onClick={handleSimulateScan}
              disabled={isScanning}
            >
              <Camera size={16} />
              <span>{isScanning ? 'Decoding QR Signature...' : 'Tap to Simulate Live Scan'}</span>
            </button>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '14px', border: '1px solid #e2e8f0', fontSize: '11.5px', color: '#64748b', lineHeight: 1.5 }}>
            <strong style={{ color: '#0f172a' }}>Forensic Scanner Compatibility:</strong> Supports Bitcoin Bech32/Legacy QR, Ethereum EIP-681 URLs, Solana Pay QR, and Base chain barcodes.
          </div>
        </div>
      )}

      {/* TAB 3: SEARCH HISTORY VIEW */}
      {activeTab === 'History' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
              Persistent Investigation History ({history.length})
            </span>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={13} />
                <span>Clear All</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8', fontSize: '13px' }}>
              No recent searches recorded yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {history.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setInputVal(s.target);
                    handleAnalyze(s.target);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                    <Clock size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {s.target}
                      </span>
                      <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                        {s.type} • {s.time}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span className="detector-risk-pill warning" style={{ fontSize: '10px' }}>
                      {s.risk}
                    </span>
                    <button
                      onClick={(e) => handleDeleteHistoryItem(e, idx)}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px' }}
                      title="Delete entry"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
