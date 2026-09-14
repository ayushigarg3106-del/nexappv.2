import React from 'react';
import { Search, QrCode, ArrowUpRight, ArrowDownRight, AlertTriangle, ShieldCheck, GitCommit, ChevronRight, Layers } from 'lucide-react';

export default function Screen02_Home({ onNavigate }) {
  const investigations = [
    {
      id: '0x7a3f...c9d2e4',
      targetScreen: 5,
      desc: 'Suspicious transaction pattern',
      badge: 'High',
      badgeClass: 'badge-danger',
      iconClass: 'red',
      time: '2 min ago',
    },
    {
      id: '4c3a1e9f...6a2c',
      targetScreen: 7,
      desc: 'Connected to high-risk entity',
      badge: 'Medium',
      badgeClass: 'badge-warning',
      iconClass: 'orange',
      time: '12 min ago',
    },
    {
      id: '1d9f4b...e7c1',
      targetScreen: 11,
      desc: 'New cluster discovered',
      badge: 'Low',
      badgeClass: 'badge-info',
      iconClass: 'blue',
      time: '32 min ago',
    },
  ];

  const now = new Date();
  const hours = now.getHours();
  let greeting = 'Good morning';
  if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
  } else if (hours >= 17 && hours < 22) {
    greeting = 'Good evening';
  } else if (hours >= 22 || hours < 5) {
    greeting = 'Welcome back';
  }

  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="screen-home">
      {/* Top Greeting & User Profile */}
      <div className="home-user-header">
        <div className="home-user-info">
          <span className="home-date-tag">{formattedDate}</span>
          <h2>{greeting}</h2>
          <p>Investigate, Trace, Uncover.</p>
        </div>
        <div className="home-avatar-btn" onClick={() => onNavigate(12)} title="Open AI Investigator">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            alt="User Profile"
          />
          <span className="avatar-online-dot" />
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="home-search-bar" onClick={() => onNavigate(3)} id="home-search-trigger">
        <Search size={16} color="#64748b" />
        <span className="home-search-input-placeholder">
          Search TxID, wallet, IP or domain...
        </span>
        <button className="home-search-qr-btn" onClick={(e) => { e.stopPropagation(); onNavigate(3); }}>
          <QrCode size={18} color="#64748b" />
        </button>
      </div>

      {/* 2x2 Metric Cards Grid */}
      <div className="home-metrics-grid">
        {/* Card 1: Transactions */}
        <div className="metric-card" onClick={() => onNavigate(7)}>
          <div className="metric-card-top">
            <div className="metric-icon-box blue">
              <Layers size={18} />
            </div>
            <div className="metric-trend green">
              <ArrowUpRight size={14} />
              <span>24%</span>
            </div>
          </div>
          <div className="metric-val">12,841</div>
          <div className="metric-label">Transactions</div>
        </div>

        {/* Card 2: High Risk */}
        <div className="metric-card" onClick={() => onNavigate(6)}>
          <div className="metric-card-top">
            <div className="metric-icon-box red">
              <AlertTriangle size={18} />
            </div>
            <div className="metric-trend red">
              <ArrowUpRight size={14} />
              <span>12%</span>
            </div>
          </div>
          <div className="metric-val">37</div>
          <div className="metric-label">High Risk</div>
        </div>

        {/* Card 3: Under Review */}
        <div className="metric-card" onClick={() => onNavigate(4)}>
          <div className="metric-card-top">
            <div className="metric-icon-box orange">
              <ShieldCheck size={18} />
            </div>
            <div className="metric-trend green">
              <ArrowUpRight size={14} />
              <span>8%</span>
            </div>
          </div>
          <div className="metric-val">124</div>
          <div className="metric-label">Under Review</div>
        </div>

        {/* Card 4: Connections */}
        <div className="metric-card" onClick={() => onNavigate(11)}>
          <div className="metric-card-top">
            <div className="metric-icon-box purple">
              <GitCommit size={18} />
            </div>
            <div className="metric-trend purple">
              <ArrowUpRight size={14} />
              <span>31%</span>
            </div>
          </div>
          <div className="metric-val">8,421</div>
          <div className="metric-label">Connections</div>
        </div>
      </div>

      {/* Recent Investigations */}
      <div className="home-section-header">
        <h3>Recent Investigations</h3>
        <button onClick={() => onNavigate(5)}>View All →</button>
      </div>

      <div className="investigations-list">
        {investigations.map((item, idx) => (
          <div
            key={idx}
            className="investigation-item"
            onClick={() => onNavigate(item.targetScreen)}
          >
            <div className={`investigation-icon ${item.iconClass}`}>
              <AlertTriangle size={18} />
            </div>
            <div className="investigation-details">
              <div className="investigation-title-row">
                <span className="investigation-address">{item.id}</span>
                <span className={item.badgeClass}>{item.badge}</span>
              </div>
              <div className="investigation-title-row">
                <span className="investigation-desc">{item.desc}</span>
                <span className="investigation-time">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
