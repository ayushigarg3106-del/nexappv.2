import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Share2, GitBranch, AlertOctagon, CheckCircle2, ChevronRight, 
  ExternalLink, Edit3, Plus, User, ShieldAlert, FileText, Check, Download, 
  Layers, Filter, Clock, Search, ShieldCheck, AlertTriangle
} from 'lucide-react';
import EditReportModal from '../components/EditReportModal';

export default function Screen05_Result({ onNavigate, queryAddress }) {
  const [activeTab, setActiveTab] = useState('Summary');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInvestigatorFilter, setSelectedInvestigatorFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Default pre-populated reports across multiple users / investigators
  const initialReports = [
    {
      id: 'NX-9041',
      title: 'Lazarus Group Mixer Dispersion',
      investigator: 'Agent Sarah Jenkins',
      agency: 'Cyber Defense Command',
      target: '0x7a3fc894726e9c9d2e4b0113f89',
      chainLabel: 'Ethereum (ERC-20)',
      cryptoIcon: '⚡',
      riskScore: 94,
      status: 'Escalated',
      volume: '$4,820,000 USDT',
      counterparties: '6 Wallets, 2 Exchanges',
      date: 'Today, 11:42 AM',
      notes: 'Identified 42 ETH peeled off into Tornado Cash relay. High velocity tumbling detected. Recommend immediate exchange freeze warrant.',
      flaggedReasons: [
        'Unusual transaction velocity',
        '3 high-risk counterparties',
        'Suspicious cluster association',
        '2-hop risk connection',
        'Matched known pattern (Peeling Chain)',
      ],
    },
    {
      id: 'NX-8820',
      title: 'Silk Road Cold Storage UTXO Peel',
      investigator: 'Ayushi Garg',
      agency: 'Lead Forensics Investigator',
      target: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      chainLabel: 'Bitcoin (UTXO)',
      cryptoIcon: '₿',
      riskScore: 88,
      status: 'Court Warrant',
      volume: '64.8 BTC ($4.1M)',
      counterparties: '12 UTXO Nodes',
      date: 'Yesterday, 04:15 PM',
      notes: 'Subpoena filed with District Court. Chainalysis attribution confirmed tier-1 darknet marketplace risk. SegWit dispersion under observation.',
      flaggedReasons: [
        'Dormant address activated after 4 years',
        'Split into 8 newly generated SegWit addresses',
        'Clustered with darknet marketplace vendor',
        'UTXO peeling chain detected',
      ],
    },
    {
      id: 'NX-7415',
      title: 'Tornado Cash Exit & P2P OTC Cashout',
      investigator: 'Special Agent Alex Vance',
      agency: 'FinCEN Task Force',
      target: '0xd90e2f91b72e12a4f1027c89b418a20',
      chainLabel: 'Ethereum (ERC-20)',
      cryptoIcon: '⚡',
      riskScore: 72,
      status: 'Under Review',
      volume: '$780,000 DAI',
      counterparties: '4 OTC Desks',
      date: '12 Sep 2026',
      notes: 'Ongoing surveillance. Awaiting subpoena response from OTC broker. Mixer pool contract interaction verified.',
      flaggedReasons: [
        'Direct deposit from Tornado 100 ETH pool',
        'Rapid multi-hop routing to P2P OTC merchant',
        'No KYC verification on receiving gateway',
        'Repeated test transfers followed by lump-sum',
      ],
    },
    {
      id: 'NX-6102',
      title: 'Cross-Chain Bridge Exploit Signature',
      investigator: 'Dr. Vikram Malhotra',
      agency: 'Threat Intelligence Lab',
      target: '0x4c3a1e9f182c896a2c',
      chainLabel: 'Hex Tx Hash',
      cryptoIcon: '🔗',
      riskScore: 81,
      status: 'Monitoring',
      volume: '$1,250,000 USDC',
      counterparties: '3 Bridge Contracts',
      date: '10 Sep 2026',
      notes: 'Bridge smart contract vulnerability exploited. Attacker wallet under automated mempool surveillance.',
      flaggedReasons: [
        'Reentrancy exploit signature detected',
        'Flash loan attack pattern verified',
        'Funds bridged across Arbitrum and Optimism',
      ],
    },
    {
      id: 'NX-5390',
      title: 'Institutional Custody Audit',
      investigator: 'Marcus Thorne',
      agency: 'Compliance Officer',
      target: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      chainLabel: 'Ethereum (ERC-20)',
      cryptoIcon: '⚡',
      riskScore: 14,
      status: 'Cleared',
      volume: '$15,400,000 ETH',
      counterparties: 'Institutional Cold Vaults',
      date: '08 Sep 2026',
      notes: 'Annual compliance audit approved. Zero mixer exposure across 5 hops. Risk rating upgraded to Tier A Whitelist.',
      flaggedReasons: [
        'Clean provenance verification',
        'Zero mixer touchpoints across 5 hops',
        'Fully licensed institutional custodian',
      ],
    },
  ];

  // Load persistent reports
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('nexchain_all_user_reports');
      return saved ? JSON.parse(saved) : initialReports;
    } catch {
      return initialReports;
    }
  });

  // Current active report ID
  const [activeReportId, setActiveReportId] = useState(() => {
    if (queryAddress) {
      const matched = initialReports.find(
        (r) => r.target.toLowerCase() === queryAddress.toLowerCase()
      );
      if (matched) return matched.id;
    }
    return reports[0]?.id || 'NX-9041';
  });

  // If queryAddress changes externally, update target or active report
  useEffect(() => {
    if (queryAddress) {
      const existing = reports.find((r) => r.target.toLowerCase() === queryAddress.toLowerCase());
      if (existing) {
        setActiveReportId(existing.id);
      }
    }
  }, [queryAddress, reports]);

  const activeReport = reports.find((r) => r.id === activeReportId) || reports[0] || initialReports[0];

  const handleSaveReport = (updatedData) => {
    const updatedList = reports.map((r) => (r.id === updatedData.id ? { ...r, ...updatedData } : r));
    setReports(updatedList);
    try {
      localStorage.setItem('nexchain_all_user_reports', JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
    setToastMessage(`Case ${updatedData.id} updated successfully!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteReport = (reportId) => {
    if (reports.length <= 1) {
      alert('At least one forensic report must remain in the dossier.');
      return;
    }
    const updatedList = reports.filter((r) => r.id !== reportId);
    setReports(updatedList);
    setActiveReportId(updatedList[0].id);
    try {
      localStorage.setItem('nexchain_all_user_reports', JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
    setIsEditModalOpen(false);
    setToastMessage(`Report ${reportId} deleted.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateNewReport = () => {
    const newId = `NX-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport = {
      id: newId,
      title: 'New Forensic Investigation Dossier',
      investigator: 'Ayushi Garg',
      agency: 'Lead Forensics Investigator',
      target: queryAddress || '0x' + Math.random().toString(16).substring(2, 42),
      chainLabel: 'Ethereum (ERC-20)',
      cryptoIcon: '⚡',
      riskScore: 65,
      status: 'Under Review',
      volume: '$500,000',
      counterparties: '2 Entities',
      date: 'Just Now',
      notes: 'Initial case dossier opened. Evidence gathering in progress.',
      flaggedReasons: ['New suspicious wallet activity', 'Unverified transaction pattern'],
    };
    const updatedList = [newReport, ...reports];
    setReports(updatedList);
    setActiveReportId(newId);
    try {
      localStorage.setItem('nexchain_all_user_reports', JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
    setToastMessage(`Created new Case Dossier ${newId}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status color pill helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Escalated':
        return { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' };
      case 'Court Warrant':
        return { bg: '#fef3c7', text: '#b45309', border: '#fcd34d' };
      case 'Under Review':
        return { bg: '#e0f2fe', text: '#0369a1', border: '#bae6fd' };
      case 'Cleared':
        return { bg: '#dcfce7', text: '#15803d', border: '#86efac' };
      case 'Monitoring':
        return { bg: '#f3e8ff', text: '#7e22ce', border: '#d8b4fe' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
    }
  };

  const getRiskDetails = (score) => {
    if (score >= 80) return { label: 'Critical Risk', color: '#ef4444', badge: 'badge-danger' };
    if (score >= 60) return { label: 'High Risk', color: '#f97316', badge: 'badge-warning' };
    if (score >= 35) return { label: 'Medium Risk', color: '#eab308', badge: 'badge-warning' };
    return { label: 'Clean / Safe', color: '#16a34a', badge: 'badge-success' };
  };

  const riskInfo = getRiskDetails(activeReport.riskScore);
  const statusStyle = getStatusBadge(activeReport.status);

  // Filtered reports list
  const filteredReports = reports.filter((r) => {
    const matchesInvestigator =
      selectedInvestigatorFilter === 'All' ||
      r.investigator.toLowerCase().includes(selectedInvestigatorFilter.toLowerCase());
    const matchesSearch =
      searchFilter === '' ||
      r.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.target.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.investigator.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesInvestigator && matchesSearch;
  });

  const investigatorsList = ['All', 'Ayushi Garg', 'Sarah Jenkins', 'Alex Vance', 'Vikram Malhotra', 'Marcus Thorne'];

  return (
    <div className="screen-result">
      {/* Header */}
      <div className="screen-header" style={{ padding: '0 0 6px 0', alignItems: 'center' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(2)} title="Back to Home">
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={18} color="#2563eb" />
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
            Forensic Reports Dossier
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className="home-metrics-edit-trigger"
            onClick={() => setIsEditModalOpen(true)}
            id="btn-edit-report-trigger"
            title="Edit Active Report"
            style={{ padding: '5px 10px', fontSize: '11px' }}
          >
            <Edit3 size={12} color="#2563eb" />
            <span>Edit Report</span>
          </button>
        </div>
      </div>

      {/* Toast Banner */}
      {toastMessage && (
        <div className="profile-toast-banner" style={{ margin: '2px 0 6px 0', animation: 'fadeIn 0.2s' }}>
          <CheckCircle2 size={16} color="#16a34a" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Investigator Filter Carousel */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
        {investigatorsList.map((inv) => {
          const isSelected = selectedInvestigatorFilter === inv;
          return (
            <button
              key={inv}
              onClick={() => setSelectedInvestigatorFilter(inv)}
              className="investigate-filter-chip"
              style={{
                background: isSelected ? '#2563eb' : '#f1f5f9',
                color: isSelected ? '#ffffff' : '#475569',
                borderColor: isSelected ? '#1d4ed8' : '#e2e8f0',
                padding: '4px 10px',
                fontSize: '11px',
                whiteSpace: 'nowrap',
                fontWeight: isSelected ? 700 : 500,
              }}
            >
              {inv === 'All' ? '👥 All Investigators' : `👤 ${inv.split(' ')[0]}`}
            </button>
          );
        })}
      </div>

      {/* Active Case Switcher Strip */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {filteredReports.map((item) => {
          const isActive = item.id === activeReportId;
          const badge = getStatusBadge(item.status);
          return (
            <div
              key={item.id}
              onClick={() => setActiveReportId(item.id)}
              style={{
                flex: '0 0 200px',
                background: isActive ? '#ffffff' : '#f8fafc',
                border: isActive ? '2px solid #2563eb' : '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '10px 12px',
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.15)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: isActive ? '#2563eb' : '#64748b' }}>
                  {item.id}
                </span>
                <span
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '8px',
                    background: badge.bg,
                    color: badge.text,
                    border: `1px solid ${badge.border}`,
                  }}
                >
                  {item.status}
                </span>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#0f172a',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '3px',
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                Investigator: <strong style={{ color: '#334155' }}>{item.investigator}</strong>
              </div>
            </div>
          );
        })}

        {/* Create New Case Button */}
        <button
          type="button"
          onClick={handleCreateNewReport}
          style={{
            flex: '0 0 110px',
            border: '1.5px dashed #93c5fd',
            background: '#eff6ff',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            cursor: 'pointer',
            padding: '10px',
            color: '#2563eb',
            fontSize: '11px',
            fontWeight: 700,
          }}
        >
          <Plus size={18} />
          <span>+ Add Case</span>
        </button>
      </div>

      {/* Case Dossier Title & Status Banner */}
      <div
        className="ui-card"
        style={{
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          color: '#ffffff',
          padding: '14px 16px',
          borderRadius: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', color: '#93c5fd', fontWeight: 700 }}>
                CASE DOSSIER #{activeReport.id}
              </span>
              <span style={{ color: '#64748b' }}>•</span>
              <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>{activeReport.date}</span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginTop: '3px' }}>
              {activeReport.title}
            </h3>
          </div>

          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '10px',
              background: statusStyle.bg,
              color: statusStyle.text,
              border: `1px solid ${statusStyle.border}`,
            }}
          >
            {activeReport.status}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: '#2563eb',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 800,
            }}
          >
            {activeReport.investigator.charAt(0)}
          </div>
          <div style={{ fontSize: '11.5px', color: '#cbd5e1' }}>
            Investigator: <strong style={{ color: '#ffffff' }}>{activeReport.investigator}</strong>
            <span style={{ color: '#64748b', margin: '0 4px' }}>|</span>
            <span>{activeReport.agency}</span>
          </div>
        </div>
      </div>

      {/* Target Entity Card */}
      <div className="target-entity-card" onClick={() => onNavigate(9)} title="View Address Details">
        <div className="target-crypto-icon">
          {activeReport.cryptoIcon || (activeReport.chainLabel.includes('Bitcoin') ? '₿' : '⚡')}
        </div>
        <div className="target-details-col" style={{ minWidth: 0 }}>
          <div
            className="target-hash-row"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {activeReport.target}
          </div>
          <div className="target-tags-row">
            <span className="crypto-pill">{activeReport.chainLabel}</span>
            <span className="crypto-pill" style={{ color: '#b91c1c', background: '#fee2e2' }}>
              Tracked: {activeReport.volume}
            </span>
          </div>
        </div>
        <ExternalLink size={16} color="#94a3b8" />
      </div>

      {/* Big Risk Score Card */}
      <div className="risk-score-banner" onClick={() => onNavigate(6)} title="View Deep Risk Analysis">
        <div className="risk-banner-header">
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Assigned Risk Assessment</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '2px' }}>
              <span className="risk-score-num">{activeReport.riskScore}</span>
              <span className="risk-score-denom">/100</span>
            </div>
          </div>
          <div
            className={riskInfo.badge}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px' }}
          >
            <AlertOctagon size={14} />
            <span>{riskInfo.label}</span>
          </div>
        </div>

        {/* Animated Risk Wave Chart */}
        <div className="risk-wave-chart">
          <svg width="100%" height="44" viewBox="0 0 300 44" fill="none" preserveAspectRatio="none">
            <path
              d="M0 38 C 40 40, 70 12, 110 24 C 150 36, 180 8, 220 18 C 260 28, 280 10, 300 16 L 300 44 L 0 44 Z"
              fill="url(#riskWaveGrad)"
            />
            <path
              d="M0 38 C 40 40, 70 12, 110 24 C 150 36, 180 8, 220 18 C 260 28, 280 10, 300 16"
              stroke={riskInfo.color}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="riskWaveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={riskInfo.color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={riskInfo.color} stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
          <span>Counterparties: <strong>{activeReport.counterparties}</strong></span>
          <span>Status: <strong style={{ color: statusStyle.text }}>{activeReport.status}</strong></span>
        </div>
      </div>

      {/* Subtabs Navigation */}
      <div className="segmented-control">
        {['Summary', 'Key Findings', 'Next Steps', 'All Reports'].map((tab) => (
          <button
            key={tab}
            className={`segmented-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: SUMMARY */}
      {activeTab === 'Summary' && (
        <>
          {/* Flagged Reasons */}
          <div className="flagged-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ margin: 0 }}>Flagged Forensic Indicators</h4>
              <span style={{ fontSize: '11px', color: '#64748b' }}>
                {activeReport.flaggedReasons.length} triggers
              </span>
            </div>
            <div className="flagged-list">
              {activeReport.flaggedReasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="flagged-bullet"
                  onClick={() => (reason.includes('Peeling Chain') ? onNavigate(10) : onNavigate(6))}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="flagged-dot" />
                  <span style={{ textDecoration: reason.includes('Peeling Chain') ? 'underline' : 'none' }}>
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Investigator Notes Box */}
          <div
            className="ui-card"
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '12px 14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <User size={14} color="#2563eb" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
                Investigator Verdict & Observations
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              {activeReport.notes}
            </p>
          </div>
        </>
      )}

      {/* TAB 2: KEY FINDINGS */}
      {activeTab === 'Key Findings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="ui-card" style={{ padding: '14px', borderRadius: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Forensic Telemetry Breakdown
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Total Monitored Inflow</span>
                <strong>{activeReport.volume}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Associated Clusters</span>
                <strong>{activeReport.counterparties}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Mixer / Tumbler Interaction</span>
                <strong style={{ color: '#ef4444' }}>Confirmed (High Velocity)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: '#64748b' }}>OFAC / Sanction Cross-Check</span>
                <strong style={{ color: '#b91c1c' }}>Matched Tier-1 Watchlist</strong>
              </div>
            </div>
          </div>

          <button
            className="btn-primary-blue"
            onClick={() => onNavigate(8)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <GitBranch size={16} />
            <span>Inspect Sankey Transaction Flow</span>
          </button>
        </div>
      )}

      {/* TAB 3: NEXT STEPS */}
      {activeTab === 'Next Steps' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="ui-card" style={{ padding: '14px', borderRadius: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Legal & Law Enforcement Actions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="investigate-filter-chip"
                style={{ padding: '10px 12px', justifyContent: 'flex-start', background: '#fef2f2', color: '#991b1b', borderColor: '#fecaca' }}
                onClick={() => {
                  setToastMessage('Asset freeze API request sent to Tether & Circle compliance.');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
              >
                <AlertOctagon size={16} color="#ef4444" />
                <div style={{ textAlign: 'left', marginLeft: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>Request Asset Freeze</div>
                  <div style={{ fontSize: '10px', color: '#b91c1c' }}>Notify issuers to blacklist token contract</div>
                </div>
              </button>

              <button
                className="investigate-filter-chip"
                style={{ padding: '10px 12px', justifyContent: 'flex-start', background: '#eff6ff', color: '#1e40af', borderColor: '#bfdbfe' }}
                onClick={() => {
                  setToastMessage('Exporting Court Evidence PDF Dossier...');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
              >
                <Download size={16} color="#2563eb" />
                <div style={{ textAlign: 'left', marginLeft: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>Export Court Dossier PDF</div>
                  <div style={{ fontSize: '10px', color: '#3b82f6' }}>Certified forensic timestamps & signatures</div>
                </div>
              </button>

              <button
                className="investigate-filter-chip"
                style={{ padding: '10px 12px', justifyContent: 'flex-start', background: '#f5f3ff', color: '#5b21b6', borderColor: '#ddd6fe' }}
                onClick={() => {
                  setToastMessage('Case escalated to Interpol Cybercrime Division.');
                  setTimeout(() => setToastMessage(null), 3000);
                }}
              >
                <ShieldAlert size={16} color="#7c3aed" />
                <div style={{ textAlign: 'left', marginLeft: '6px' }}>
                  <div style={{ fontWeight: 700, fontSize: '12px' }}>Escalate to Interpol & Europol</div>
                  <div style={{ fontSize: '10px', color: '#6d28d9' }}>Multi-jurisdiction mutual legal assistance</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ALL REPORTS DIRECTORY */}
      {activeTab === 'All Reports' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Search bar inside reports */}
          <div className="home-search-bar" style={{ padding: '6px 12px' }}>
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search reports by ID, user, or address..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredReports.map((rep) => {
              const badge = getStatusBadge(rep.status);
              const isCurrent = rep.id === activeReportId;
              return (
                <div
                  key={rep.id}
                  onClick={() => {
                    setActiveReportId(rep.id);
                    setActiveTab('Summary');
                  }}
                  style={{
                    background: isCurrent ? '#eff6ff' : '#ffffff',
                    border: isCurrent ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>
                      {rep.id}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '8px',
                        background: badge.bg,
                        color: badge.text,
                      }}
                    >
                      {rep.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                    {rep.title}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    <span>👤 {rep.investigator}</span>
                    <span style={{ color: rep.riskScore >= 70 ? '#ef4444' : '#16a34a', fontWeight: 700 }}>
                      Risk: {rep.riskScore}/100
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="result-actions-row">
        <button
          className="btn-primary-blue"
          onClick={() => onNavigate(11)}
          id="btn-explore-network"
        >
          Explore Network
        </button>
        <button
          className="btn-secondary-light"
          onClick={() => onNavigate(6)}
          id="btn-view-evidence"
        >
          View Evidence
        </button>
      </div>

      {/* Edit Report Modal */}
      <EditReportModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        report={activeReport}
        onSaveReport={handleSaveReport}
        onDeleteReport={handleDeleteReport}
      />
    </div>
  );
}
