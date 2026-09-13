import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export default function Screen01_Splash({ onNavigate }) {
  return (
    <div className="screen-splash">
      {/* Full-Screen Minimalist Pink-Cyan Bitcoin Background */}
      <img
        src="/assets/nexchain_splash_bg.jpg"
        alt="NexChain Bitcoin Minimalist Background"
        className="splash-bg-cover"
      />
      <div className="splash-bg-overlay" />

      {/* Top Brand Info */}
      <div className="splash-header">
        <div className="splash-logo-shield animate-float">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="splash-title">NexChain</h1>
        <p className="splash-subtitle">
          Blockchain Intelligence<br />for a Safer Tomorrow
        </p>
      </div>

      {/* Open Center Spacer showcasing the Bitcoin centerpiece */}
      <div className="splash-center-spacer" />

      {/* Bottom CTA Area */}
      <div className="splash-bottom-actions">
        <div className="splash-tagline-pills">
          <span>TRACE</span>
          <span className="dot" />
          <span>ANALYZE</span>
          <span className="dot" />
          <span>PROTECT</span>
        </div>

        <button
          className="btn-get-started"
          onClick={() => onNavigate(2)}
          id="btn-get-started"
        >
          <span>Get Started</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

        <div className="splash-trust-text">
          <Shield size={13} color="#38bdf8" />
          <span>Trusted by investigators worldwide.</span>
        </div>
      </div>
    </div>
  );
}

