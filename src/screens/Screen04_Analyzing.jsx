import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Scan, CheckCircle2, Loader2, Circle, FastForward } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Screen04_Analyzing({ onNavigate, queryAddress }) {
  const [progress, setProgress] = useState(58);
  const [activeStepIndex, setActiveStepIndex] = useState(3); // 0-indexed, so step 4 is active initially (58%)

  const steps = [
    { title: 'Data Ingestion', meta: '12,842 records' },
    { title: 'Normalization', meta: 'Standardizing data' },
    { title: 'Entity Resolution', meta: 'Linking related entities' },
    { title: 'Building Investigation Graph', meta: '8,421 nodes • 17,382 edges' },
    { title: 'Feature Extraction', meta: 'Extracting behavioral features' },
    { title: 'Anomaly Detection', meta: 'Detecting unusual patterns' },
    { title: 'Pattern Analysis', meta: 'Identifying transaction patterns' },
    { title: 'Risk Propagation', meta: 'Calculating network risk' },
  ];

  // Auto increment progress smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          try {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
          } catch (_) {}
          setTimeout(() => onNavigate(5), 700);
          return 100;
        }
        const next = prev + 3;
        // update active step index based on progress
        const stepIdx = Math.min(steps.length - 1, Math.floor((next / 100) * steps.length));
        setActiveStepIndex(stepIdx);
        return next;
      });
    }, 600);

    return () => clearInterval(timer);
  }, [onNavigate, steps.length]);

  return (
    <div className="screen-analyzing">
      {/* Screen Header */}
      <div className="screen-header" style={{ padding: '0 0 6px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(3)}>
          <ArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Scan size={18} color="#2563eb" className="animate-spin-slow" />
        </div>
        <button className="header-icon-btn">
          <Share2 size={16} />
        </button>
      </div>

      {/* Title Area */}
      <div className="analyzing-title-area">
        <h2>Analysing Evidence</h2>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '20px', padding: '4px 12px', marginTop: '6px', maxWidth: '90%', overflow: 'hidden' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#1d4ed8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {queryAddress || '0x7a3fc894726e9c9d2e4b0113f89'}
          </span>
        </div>
      </div>

      {/* 3D Floating Layers Visual */}
      <div className="analyzing-3d-cube-wrapper">
        <div className="analyzing-floating-stack">
          <div className="stack-layer stack-layer-1" />
          <div className="stack-layer stack-layer-2" />
          <div className="stack-layer stack-layer-3" />
        </div>
      </div>

      {/* 8 Pipeline Checklist Steps */}
      <div className="pipeline-steps-card">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeStepIndex;
          const isActive = idx === activeStepIndex;
          const isPending = idx > activeStepIndex;

          return (
            <div key={idx} className="pipeline-step-row">
              {isCompleted && (
                <div className="step-status-icon done">
                  <CheckCircle2 size={15} strokeWidth={2.5} />
                </div>
              )}
              {isActive && (
                <div className="step-status-icon active">
                  <Loader2 size={14} className="animate-spin" />
                </div>
              )}
              {isPending && (
                <div className="step-status-icon pending">
                  <Circle size={10} />
                </div>
              )}

              <div className="step-info-col">
                <span className="step-title" style={{ color: isPending ? '#94a3b8' : '#0f172a' }}>
                  {step.title}
                </span>
                <span className="step-meta" style={{ color: isPending ? '#cbd5e1' : '#64748b' }}>
                  {step.meta}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Progress Bar & Time */}
      <div className="pipeline-progress-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Forensic Pipeline</span>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>{progress}%</span>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
            This may take a few minutes...
          </span>

          <button
            onClick={() => onNavigate(5)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: 'none',
              background: 'none',
              color: '#2563eb',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <span>Skip to Result</span>
            <FastForward size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
