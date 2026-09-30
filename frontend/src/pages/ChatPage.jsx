import { useState, useEffect, useRef } from 'react';
import { chatApi } from '../api/chatApi';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Send, Bot, User, Zap, MessageCircle } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { DEMO_MODE } from '../api/apiClient';

const QUICK_ACTIONS = [
  'Plan my day',
  'Show my tasks',
  'What should I work on?',
  'Show reminders',
  'What do you know about me?',
  'Show my habits',
  'Start a workout',
  'Add a task',
];

function ChatBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className="bubble-in" style={{ display: 'flex', gap: 10, justifyContent: isUser ? 'flex-end' : 'flex-start', alignItems: 'flex-end' }}>
      {!isUser && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap size={14} color="white" />
        </div>
      )}
      <div style={{
        maxWidth: '75%', padding: '12px 16px', borderRadius: isUser ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
        background: isUser
          ? 'linear-gradient(135deg, #dc2626, #991b1b)'
          : 'rgba(255,255,255,0.06)',
        border: isUser ? 'none' : '1px solid rgba(255,255,255,0.1)',
        boxShadow: isUser ? '0 4px 15px rgba(220,38,38,0.25)' : 'none',
      }}>
        <p style={{ color: '#f1f5f9', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>
          {message.content}
        </p>
        <p style={{ color: isUser ? 'rgba(255,255,255,0.5)' : '#475569', fontSize: 10, marginTop: 4, textAlign: isUser ? 'right' : 'left' }}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {isUser && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <User size={15} color="#94a3b8" />
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Zap size={14} color="white" />
      </div>
      <div style={{ padding: '14px 18px', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 5 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#dc2626' }} />
        ))}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const hist = await chatApi.getHistory();
        setMessages(hist);
      } catch {
        setMessages([{
          id: 'welcome', role: 'assistant', content: "Hello! I'm ATHENA, your personal digital twin. How can I help you today?",
          timestamp: new Date().toISOString(),
        }]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content) return;

    const userMsg = { id: 'm' + Date.now(), role: 'user', content, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      const res = await chatApi.sendMessage(content);
      const athenaMsg = {
        id: 'm' + (Date.now() + 1),
        role: 'assistant',
        content: res.response,
        timestamp: new Date().toISOString(),
        selectedAgents: res.selected_agents,
      };
      setMessages((prev) => [...prev, athenaMsg]);
    } catch {
      addToast({ title: 'Connection error', message: 'Could not reach ATHENA. Please try again.', type: 'error' });
    } finally {
      setTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 108px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(135deg, #dc2626, #7f1d1d)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(220,38,38,0.35)' }}>
          <Zap size={22} color="white" />
        </div>
        <div>
          <h1 style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 800 }}>Chat with ATHENA</h1>
          <p style={{ color: '#64748b', fontSize: 12 }}>Your digital twin is always here</p>
        </div>
        {DEMO_MODE && (
          <div style={{ marginLeft: 'auto', padding: '4px 10px', borderRadius: 100, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24', fontSize: 11, fontWeight: 600 }}>
            DEMO MODE
          </div>
        )}
      </div>

      {/* Chat area */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 10px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}><LoadingSpinner size={32} /></div>
          ) : messages.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 16, paddingTop: 40 }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={28} color="#dc2626" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#f1f5f9', fontWeight: 600 }}>Start a conversation</p>
                <p style={{ color: '#64748b', fontSize: 13 }}>Ask ATHENA anything about your tasks, wellness, reminders, or habits.</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)
          )}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick actions */}
        <div style={{ padding: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8 }}>
          {QUICK_ACTIONS.map((action) => (
            <button key={action} onClick={() => sendMessage(action)} style={{
              padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
              background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171', transition: 'all 0.2s',
            }}>
              {action}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 10 }}>
          <input
            ref={inputRef}
            className="athena-input"
            placeholder="Ask ATHENA anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            style={{ flex: 1 }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || typing}
            className="athena-btn-primary"
            style={{ padding: '10px 16px', flexShrink: 0, opacity: !input.trim() || typing ? 0.5 : 1 }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
