import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Paw SVG logo for bot avatar
const BotAvatar = () => (
    <div style={{
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #FF6B6B, #FF8B94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '16px', boxShadow: '0 2px 8px rgba(255,107,107,0.4)'
    }}>🐾</div>
);

const UserAvatar = () => (
    <div style={{
        width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #4ECDC4, #A8E6CF)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '16px', boxShadow: '0 2px 8px rgba(78,205,196,0.4)'
    }}>😊</div>
);

// Renders bot message text — supports bullet lists
const BotText = ({ text }) => {
    const lines = text.split(/\n+/).filter(l => l.trim());
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.88rem', lineHeight: '1.55' }}>
            {lines.map((line, i) => {
                const trimmed = line.trim();
                // Already a bullet point
                if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || trimmed.startsWith('* ')) {
                    return (
                        <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <span style={{ color: '#FF6B6B', fontWeight: 800, marginTop: '1px', flexShrink: 0 }}>•</span>
                            <span>{trimmed.replace(/^[-•*]\s*/, '')}</span>
                        </div>
                    );
                }
                // Numbered list  1. 2. etc
                if (/^\d+\./.test(trimmed)) {
                    return (
                        <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <span style={{ color: '#4ECDC4', fontWeight: 800, flexShrink: 0 }}>{trimmed.match(/^\d+/)[0]}.</span>
                            <span>{trimmed.replace(/^\d+\.\s*/, '')}</span>
                        </div>
                    );
                }
                return <span key={i}>{trimmed}</span>;
            })}
        </div>
    );
};

const Chatbot = ({ triggerAction }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { text: "Hi! I'm **PawBot** 🐾 — your quick pet helper!\n- Ask me about health, adoption, lost pets, or vaccinations.", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (triggerAction && triggerAction.trim() !== '') {
            handleSendMsg(triggerAction);
        }
    }, [triggerAction]);

    const handleSendMsg = async (userMsg) => {
        if (!userMsg.trim() || loading) return;
        setInput('');
        setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/chatbot', { message: userMsg });
            setMessages(prev => [...prev, { text: res.data.reply, isBot: true }]);
        } catch {
            setMessages(prev => [...prev, { text: "Sorry, I can't connect right now. Try again!", isBot: true }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = () => handleSendMsg(input);

    const actionBtnStyle = {
        padding: '0.4rem 0.9rem',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        width: 'fit-content',
        marginTop: '0.4rem',
        fontWeight: 700,
        fontSize: '0.8rem',
        fontFamily: "'Nunito', sans-serif"
    };

    return (
        <div style={{
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,107,107,0.15)',
            borderRadius: '24px',
            overflow: 'hidden'
        }}>
            {/* Chat Header */}
            <div style={{
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(78,205,196,0.1))',
                borderBottom: '1px solid rgba(255,107,107,0.15)',
                display: 'flex', alignItems: 'center', gap: '0.75rem'
            }}>
                <div style={{ fontSize: '1.8rem', animation: 'pawBounce 3s ease-in-out infinite' }}>🐾</div>
                <div>
                    <div style={{ fontWeight: 800, fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', color: '#FF6B6B' }}>PawBot</div>
                    <div style={{ fontSize: '0.72rem', color: '#4ECDC4', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ECDC4', display: 'inline-block' }} />
                        Online • Quick & Precise Answers
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '1rem', paddingBottom: '0.5rem' }}>
                {messages.map((m, i) => (
                    <div key={i} style={{
                        display: 'flex',
                        flexDirection: m.isBot ? 'row' : 'row-reverse',
                        alignItems: 'flex-end',
                        gap: '0.5rem'
                    }}>
                        {m.isBot ? <BotAvatar /> : <UserAvatar />}
                        <div style={{
                            background: m.isBot
                                ? 'rgba(255,255,255,0.06)'
                                : 'linear-gradient(135deg, #FF6B6B, #FF8B94)',
                            padding: '0.8rem 1rem',
                            borderRadius: m.isBot ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                            maxWidth: '80%',
                            border: m.isBot ? '1px solid rgba(255,107,107,0.12)' : 'none',
                            boxShadow: m.isBot ? 'none' : '0 4px 15px rgba(255,107,107,0.3)',
                            display: 'flex', flexDirection: 'column', gap: '0.4rem',
                            color: m.isBot ? 'rgba(255,255,255,0.88)' : '#fff'
                        }}>
                            {m.isBot ? (
                                (() => {
                                    // Split out [ACTION:...] tags
                                    const parts = m.text.split(/(\[ACTION:[A-Z]+\])/);
                                    return parts.map((part, idx) => {
                                        if (part === '[ACTION:BOOK]') return (
                                            <button key={idx} onClick={() => navigate('/vaccination')} style={{ ...actionBtnStyle, background: 'linear-gradient(135deg, #FF6B6B, #FF8B94)', color: '#000000' }}>
                                                📅 Book Consultation <ChevronRight size={14} />
                                            </button>
                                        );
                                        if (part === '[ACTION:ADOPT]') return (
                                            <button key={idx} onClick={() => navigate('/adopt')} style={{ ...actionBtnStyle, background: 'linear-gradient(135deg, #4ECDC4, #A8E6CF)', color: '#1a1a2e' }}>
                                                🐶 Adopt a Pet <ChevronRight size={14} />
                                            </button>
                                        );
                                        if (part === '[ACTION:LOST]') return (
                                            <button key={idx} onClick={() => navigate('/lost-found')} style={{ ...actionBtnStyle, background: 'linear-gradient(135deg, #FFE66D, #FF8B94)', color: '#1a1a2e' }}>
                                                🔍 Report Lost Pet <ChevronRight size={14} />
                                            </button>
                                        );
                                        return <BotText key={idx} text={part} />;
                                    });
                                })()
                            ) : (
                                <span style={{ fontSize: '0.88rem', lineHeight: '1.5' }}>{m.text}</span>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                        <BotAvatar />
                        <div style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,107,107,0.12)',
                            padding: '0.8rem 1.2rem',
                            borderRadius: '18px 18px 18px 4px',
                            display: 'flex', gap: '4px', alignItems: 'center'
                        }}>
                            {[0, 1, 2].map(j => (
                                <div key={j} style={{
                                    width: '7px', height: '7px', borderRadius: '50%',
                                    background: '#FF6B6B',
                                    animation: `pawBounce 1.2s ease-in-out ${j * 0.2}s infinite`
                                }} />
                            ))}
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,107,107,0.1)', display: 'flex', gap: '0.5rem' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask PawBot anything... 🐾"
                    disabled={loading}
                    style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,107,107,0.2)',
                        padding: '0.75rem 1.1rem',
                        borderRadius: '14px',
                        color: '#000000',
                        outline: 'none',
                        fontSize: '0.88rem',
                        fontFamily: "'Nunito', sans-serif",
                        opacity: loading ? 0.6 : 1,
                        transition: 'border-color 0.2s ease',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,107,107,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,107,107,0.2)'}
                />
                <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    style={{
                        width: '46px', height: '46px',
                        background: (loading || !input.trim()) ? 'rgba(255,107,107,0.2)' : 'linear-gradient(135deg, #FF6B6B, #FF8B94)',
                        border: 'none',
                        borderRadius: '14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: (loading || !input.trim()) ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: (loading || !input.trim()) ? 'none' : '0 4px 15px rgba(255,107,107,0.35)',
                        flexShrink: 0
                    }}
                >
                    <Send size={18} color="#000000" />
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
