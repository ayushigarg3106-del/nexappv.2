import React from 'react';
import { Home, ScanLine, GitFork, FileText, Menu } from 'lucide-react';

export default function BottomNavBar({ currentScreen, onNavigate }) {
  const tabs = [
    { id: 2, label: 'Home', icon: Home },
    { id: 3, label: 'Scan', icon: ScanLine },
    { id: 11, label: 'Graph', icon: GitFork },
    { id: 10, label: 'Reports', icon: FileText },
    { id: 6, label: 'More', icon: Menu },
  ];

  return (
    <div className="mobile-bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(tab.id)}
            title={`Go to ${tab.label}`}
          >
            <div className="nav-icon-wrapper">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
