import React from 'react';
import { ShieldCheck, ArrowRight, Lock, Activity } from 'lucide-react';

export default function Screen01_Splash({ onNavigate }) {
  return (
    <div className="screen-splash">
      {/* Full-Screen Dark Cyber Forensics Shield Background (No Bitcoin) */}
      <img
        src="/assets/nexchain_forensic_splash.jpg"
        alt="NexChain Cyber Forensics Holographic Shield"
        className="splash-bg-cover"
      />
      <div className="splash-bg-overlay" />

      {/* Top Brand Info */}
      <div className="splash-header">
        <div className="splash-badge">
          <span className="pulse-dot" />
          <span>CYBER FORENSICS v2.4</span>
        </div>

        <div className="splash-logo-shield animate-float">
          <ShieldCheck size={28} color="#38bdf8" strokeWidth={2.2} />
        </div>
        <h1 className="splash-title">NexChain</h1>
        <p className="splash-subtitle">
          Institutional Blockchain Forensics<br />& AML Cyber Intelligence
        </p>
      </div>

      {/* Open Center Spacer showcasing the 3D Holographic Cyber Shield */}
      <div className="splash-center-spacer" />

      {/* Bottom CTA Area */}
      <div className="splash-bottom-actions">
        {/* Core Capabilities Pills */}
        <div className="splash-tagline-pills">
          <Activity size={12} color="#38bdf8" />
          <span>TRACE</span>
          <span className="dot" />
          <span>DECRYPT</span>
          <span className="dot" />
          <span>PROTECT</span>
        </div>

        {/* Live Forensic Telemetry Micro-Bar */}
        <div className="splash-telemetry-bar">
          <div className="telemetry-item">
            <span className="telemetry-val">14.8M</span>
            <span className="telemetry-lbl">Nodes Tracked</span>
          </div>
          <div className="telemetry-sep" />
          <div className="telemetry-item">
            <span className="telemetry-val">0.4s</span>
            <span className="telemetry-lbl">Trace Latency</span>
          </div>
          <div className="telemetry-sep" />
          <div className="telemetry-item">
            <span className="telemetry-val">100%</span>
            <span className="telemetry-lbl">OFAC Sync</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="btn-get-started"
          onClick={() => onNavigate(2)}
          id="btn-get-started"
        >
          <span>Enter Investigation Terminal</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

        {/* Security & Compliance Cert */}
        <div className="splash-trust-text">
          <Lock size={12} color="#38bdf8" />
          <span>256-Bit Quantum Encryption • FinCEN & FATF Compliant</span>
        </div>
      </div>
    </div>
  );
}

