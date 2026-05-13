import React, { useState, useEffect, useRef } from 'react';
import { Send, PawPrint } from 'lucide-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text:
                "🐾 Hi! I'm PawBot. Ask me about pet food, grooming, vaccines, emergencies, dogs, cats, or training!"
        }
    ]);

    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    const getBotReply = (message) => {
        const text = message.toLowerCase();

        if (
            text.includes('hi') ||
            text.includes('hello') ||
            text.includes('hey')
        ) {
            return '🐶 Hello! How can I help your pet today?';
        }

        if (
            text.includes('food') ||
            text.includes('eat') ||
            text.includes('diet')
        ) {
            return '🍖 Give pets balanced meals with proteins, healthy fats, and fresh water. Avoid chocolate, onions, and grapes.';
        }

        if (
            text.includes('vaccine') ||
            text.includes('vaccination')
        ) {
            return '💉 Pets need vaccinations to stay protected from diseases. Visit a vet regularly.';
        }

        if (
            text.includes('groom') ||
            text.includes('bath') ||
            text.includes('hair')
        ) {
            return '🛁 Regular grooming keeps pets healthy and clean. Use pet-safe shampoo only.';
        }

        if (
            text.includes('emergency') ||
            text.includes('injury') ||
            text.includes('bleeding')
        ) {
            return '🚨 Please contact a veterinarian immediately if your pet is seriously injured.';
        }

        if (text.includes('dog')) {
            return '🐕 Dogs need exercise, clean water, healthy food and lots of love.';
        }

        if (text.includes('cat')) {
            return '🐈 Cats love clean litter boxes, quiet spaces and proper hydration.';
        }

        if (
            text.includes('train') ||
            text.includes('training')
        ) {
            return '🎾 Positive reinforcement and rewards are best for training pets.';
        }

        return '🐾 I can help with food, grooming, vaccines, emergencies, dogs, cats and training!';
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = {
            role: 'user',
            text: input
        };

        const botMessage = {
            role: 'bot',
            text: getBotReply(input)
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
            botMessage
        ]);

        setInput('');
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
                        color: '#fff'
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
                        ● Offline Assistant
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
                    gap: '1rem'
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
                                fontSize: '0.92rem'
                            }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                <div ref={chatEndRef}></div>
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
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Ask PawBot anything..."
                        style={{
                            flex: 1,
                            padding: '0.95rem 1rem',
                            borderRadius: '16px',
                            border:
                                '1px solid rgba(255,107,107,0.15)',
                            outline: 'none',
                            fontSize: '0.92rem'
                        }}
                    />

                    <button
                        onClick={sendMessage}
                        style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '16px',
                            border: 'none',
                            background:
                                'linear-gradient(135deg,#FF6B6B,#FF8B94)',
                            color: '#fff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
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