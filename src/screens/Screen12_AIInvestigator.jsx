import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, Send, Bot, CheckCircle2, Sparkles, FileSpreadsheet } from 'lucide-react';

export default function Screen12_AIInvestigator({ onNavigate }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      text: 'Why is this wallet suspicious?',
    },
    {
      id: 2,
      sender: 'ai',
      intro: "I'm analyzing the available evidence...",
      checks: [
        'Transaction history',
        'Counterparties',
        'Network connections',
        'Behavioral signals',
        'Risk propagation',
      ],
      callout: 'This wallet shows unusually high transaction velocity and interacts with multiple higher-risk entities. It is part of a suspicious cluster and matches known peeling chain patterns. Further investigation is recommended.',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    'Show connections',
    'Find patterns',
    'Generate report',
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI Intelligence reasoning & response
    setTimeout(() => {
      let aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        intro: `Analysis synthesized for query: "${query}"`,
        checks: ['On-chain telemetry verified', 'AML risk heuristics correlated', 'Graph cluster 3 traced'],
        callout: '',
      };

      if (query.toLowerCase().includes('connection')) {
        aiResponse.callout = 'Target 0x7a3f has 47 counterparties. Top connection is Binance Hot Wallet (38% volume) followed by Tornado-like Mixer Proxy (29% volume).';
      } else if (query.toLowerCase().includes('pattern')) {
        aiResponse.callout = 'Detected Peeling Chain (87% confidence) with 12 split transactions executing in under 4 minutes. Classic automated distribution script.';
      } else if (query.toLowerCase().includes('report')) {
        aiResponse.callout = 'Case dossier #CS-2026-992 compiled. Downloadable as LEA-standard PDF with SHA-256 chain of custody verification.';
      } else {
        aiResponse.callout = 'Forensic graph indicates high correlation with European cybercrime syndicate cluster #44. Recommended action: freeze counterparty exchange accounts.';
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="screen-ai-investigator">
      {/* Header */}
      <div className="screen-header" style={{ padding: '0 0 6px 0' }}>
        <button className="header-icon-btn" onClick={() => onNavigate(2)}>
          <ArrowLeft size={18} />
        </button>
        <span className="header-title">AI Investigator</span>
        <button className="header-icon-btn">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Chat Messages List */}
      <div className="ai-chat-messages">
        {messages.map((m) => {
          if (m.sender === 'user') {
            return (
              <div key={m.id} className="chat-bubble-user">
                {m.text}
              </div>
            );
          }

          return (
            <div key={m.id} className="chat-ai-response-card">
              <div className="ai-avatar-tag">
                <Sparkles size={16} color="#2563eb" />
                <span>{m.intro}</span>
              </div>

              {m.checks && (
                <div className="ai-check-list">
                  {m.checks.map((c, i) => (
                    <div key={i} className="ai-check-item">
                      <CheckCircle2 size={13} color="#10b981" strokeWidth={2.5} />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="ai-callout-text">
                {m.callout}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-ai-response-card" style={{ maxWidth: '60%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '12px' }}>
              <Bot size={16} className="animate-spin" />
              <span>Analyzing blockchain blocks...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Action Chips */}
      <div className="ai-suggested-prompts">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            className="ai-prompt-chip"
            onClick={() => handleSend(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="ai-input-bar">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything..."
          id="ai-chat-input"
        />
        <button
          className="btn-ai-send"
          onClick={() => handleSend()}
          id="btn-ai-send"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
