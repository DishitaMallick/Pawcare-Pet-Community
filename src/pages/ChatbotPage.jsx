import React, { useState, useEffect, useRef } from 'react';
import { Send, PawPrint } from 'lucide-react';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const Chatbot = ({ triggerAction }) => {
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text:
                "🐾 Hi! I'm PawBot.\nAsk me anything about pet care, health, grooming, food, or emergencies!"
        }
    ]);

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    useEffect(() => {
        if (triggerAction) {
            sendMessage(triggerAction);
        }
    }, [triggerAction]);

    const sendMessage = async (customText) => {
        const text = customText || input;

        if (!text.trim()) return;

        const userMessage = {
            role: 'user',
            text
        };

        setMessages(prev => [...prev, userMessage]);

        setInput('');
        setLoading(true);

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: 'user',
                                parts: [
                                    {
                                        text: text
                                    }
                                ]
                            }
                        ]
                    }),
                }
            );

            const data = await response.json();

            console.log(data);

            if (data.error) {
                throw new Error(data.error.message);
            }

            const botReply =
                data.candidates?.[0]?.content?.parts?.[0]?.text;

            setMessages(prev => [
                ...prev,
                {
                    role: 'bot',
                    text:
                        botReply ||
                        '⚠️ Gemini returned an empty response.'
                }
            ]);
        }

        catch (error) {
            console.log(error);

            setMessages(prev => [
                ...prev,
                {
                    role: 'bot',
                    text: `⚠️ ${error.message}`
                }
            ]);
        }

        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div
            style={{
                background: '#ffffff',
                borderRadius: '28px',
                border: '1px solid rgba(255,107,107,0.12)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '650px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}
        >

            {/* HEADER */}
            <div
                style={{
                    padding: '1rem 1.3rem',
                    borderBottom: '1px solid rgba(255,107,107,0.08)',
                    background:
                        'linear-gradient(135deg, rgba(255,107,107,0.08), rgba(78,205,196,0.08))',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.9rem'
                }}
            >
                <div
                    style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '14px',
                        background: '#FF6B6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(255,107,107,0.3)'
                    }}
                >
                    <PawPrint size={20} />
                </div>

                <div>
                    <h3
                        style={{
                            margin: 0,
                            fontSize: '1rem',
                            color: '#FF6B6B',
                            fontWeight: 800
                        }}
                    >
                        PawBot
                    </h3>

                    <p
                        style={{
                            margin: 0,
                            fontSize: '0.8rem',
                            color: '#4ECDC4',
                            fontWeight: 600
                        }}
                    >
                        ● Online AI Assistant
                    </p>
                </div>
            </div>

            {/* CHAT AREA */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background:
                        'linear-gradient(to bottom, #fff, rgba(255,248,248,0.6))'
                }}
            >
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            justifyContent:
                                msg.role === 'user'
                                    ? 'flex-end'
                                    : 'flex-start'
                        }}
                    >
                        <div
                            style={{
                                maxWidth: '78%',
                                padding: '0.9rem 1rem',
                                borderRadius:
                                    msg.role === 'user'
                                        ? '18px 18px 4px 18px'
                                        : '18px 18px 18px 4px',

                                background:
                                    msg.role === 'user'
                                        ? '#FF6B6B'
                                        : '#f4f4f4',

                                color:
                                    msg.role === 'user'
                                        ? '#ffffff'
                                        : '#222222',

                                lineHeight: 1.6,
                                fontSize: '0.92rem',
                                whiteSpace: 'pre-wrap',

                                boxShadow:
                                    msg.role === 'user'
                                        ? '0 6px 16px rgba(255,107,107,0.25)'
                                        : '0 4px 10px rgba(0,0,0,0.04)'
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div
                        style={{
                            color: '#777',
                            fontSize: '0.9rem'
                        }}
                    >
                        PawBot is typing...
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* INPUT */}
            <div
                style={{
                    padding: '1rem',
                    borderTop: '1px solid rgba(255,107,107,0.08)',
                    background: '#fff'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '0.8rem',
                        alignItems: 'center'
                    }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask PawBot anything..."
                        style={{
                            flex: 1,
                            padding: '0.95rem 1rem',
                            borderRadius: '16px',
                            border:
                                '1px solid rgba(255,107,107,0.15)',
                            outline: 'none',
                            fontSize: '0.92rem',
                            background: '#fff',
                            color: '#222'
                        }}
                    />

                    <button
                        onClick={() => sendMessage()}
                        disabled={loading}
                        style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '16px',
                            border: 'none',
                            background:
                                loading
                                    ? '#ffb3b3'
                                    : 'linear-gradient(135deg,#FF6B6B,#FF8B94)',

                            color: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: '0.3s ease',
                            boxShadow:
                                '0 6px 16px rgba(255,107,107,0.25)'
                        }}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;