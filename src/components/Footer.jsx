import React, { useState } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Share2,
    Link
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const PawLogo = () => (
    <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="22" rx="10" ry="8" fill="url(#fPawGrad)" />
        <ellipse cx="10" cy="13" rx="3.5" ry="4.5" fill="url(#fPawGrad)" />
        <ellipse cx="18" cy="11" rx="3.5" ry="4.5" fill="url(#fPawGrad)" />
        <ellipse cx="26" cy="13" rx="3.5" ry="4.5" fill="url(#fPawGrad)" />

        <defs>
            <linearGradient id="fPawGrad" x1="0" y1="0" x2="36" y2="36">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#4ECDC4" />
            </linearGradient>
        </defs>
    </svg>
);

const Footer = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleJoin = () => {
        if (!email.trim() || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        alert(`🐾 Welcome to PawCare, ${email}!`);
        setEmail('');
    };

    const quickLinks = [
        { label: '🐶 Adopt a Pet', path: '/adopt' },
        { label: '🗺️ Pet Map', path: '/map' },
        { label: '🔍 Lost & Found', path: '/lost-found' },
        { label: '💉 Vaccination', path: '/vaccination' },
        { label: '🤖 PawBot AI', path: '/chatbot' },
    ];

    const socialLinks = [
        {
            icon: Globe,
            action: () => window.open('https://google.com', '_blank')
        },
        {
            icon: Share2,
            action: async () => {
                if (navigator.share) {
                    await navigator.share({
                        title: 'PawCare',
                        text: 'Check out PawCare!',
                        url: window.location.href
                    });
                } else {
                    alert('Sharing not supported on this device');
                }
            }
        },
        {
            icon: Link,
            action: async () => {
                await navigator.clipboard.writeText(window.location.href);
                alert('🔗 Link copied!');
            }
        }
    ];

    return (
        <footer
            style={{
                margin: '2rem 1rem 1rem',
                padding: '3rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,107,107,0.12)',
                borderRadius: '28px',
                backdropFilter: 'blur(12px)',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '2rem'
                }}
            >

                {/* BRAND */}
                <div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <PawLogo />

                        <span
                            style={{
                                fontSize: '1.1rem',
                                fontFamily: "'Fredoka One', cursive",
                                color: '#FF6B6B',
                                fontWeight: 600,
                                letterSpacing: '0.3px'
                            }}
                        >
                            PawCare
                        </span>
                    </div>

                    <p
                        style={{
                            color: 'rgba(0,0,0,0.55)',
                            fontSize: '0.92rem',
                            lineHeight: 1.7
                        }}
                    >
                        Making the world safer and happier for our furry friends
                        through technology and community. 🐾
                    </p>

                    {/* SOCIAL ICONS */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.8rem',
                            marginTop: '1.3rem'
                        }}
                    >
                        {socialLinks.map((item, i) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={i}
                                    onClick={item.action}
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '12px',
                                        background: 'rgba(255,107,107,0.08)',
                                        border:
                                            '1px solid rgba(255,107,107,0.15)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        color: '#d0a9a9',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            'rgba(255,107,107,0.18)';

                                        e.currentTarget.style.color =
                                            '#FF6B6B';

                                        e.currentTarget.style.transform =
                                            'translateY(-3px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            'rgba(255,107,107,0.08)';

                                        e.currentTarget.style.color =
                                            '#d0a9a9';

                                        e.currentTarget.style.transform =
                                            'translateY(0px)';
                                    }}
                                >
                                    <Icon size={18} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h4
                        style={{
                            color: '#FF6B6B',
                            marginBottom: '1rem',
                            fontFamily: "'Fredoka One', cursive"
                        }}
                    >
                        Quick Links
                    </h4>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.7rem'
                        }}
                    >
                        {quickLinks.map((link, i) => (
                            <span
                                key={i}
                                onClick={() => navigate(link.path)}
                                style={{
                                    color: 'rgba(0,0,0,0.58)',
                                    cursor: 'pointer',
                                    transition: '0.2s ease',
                                    fontWeight: 600,
                                    fontSize: '0.92rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#FF6B6B';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color =
                                        'rgba(0,0,0,0.58)';
                                }}
                            >
                                {link.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CONTACT */}
                <div>
                    <h4
                        style={{
                            color: '#4ECDC4',
                            marginBottom: '1rem',
                            fontFamily: "'Fredoka One', cursive"
                        }}
                    >
                        Contact Us
                    </h4>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem',
                            color: 'rgba(0,0,0,0.55)',
                            fontSize: '0.9rem'
                        }}
                    >
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Mail size={16} color="#4ECDC4" />
                            support@pawcare.com
                        </span>

                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Phone size={16} color="#4ECDC4" />
                            +1 (555) 123-4567
                        </span>

                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <MapPin size={16} color="#4ECDC4" />
                            123 Paw Lane, Pet City
                        </span>
                    </div>
                </div>

                {/* NEWSLETTER */}
                <div>
                    <h4
                        style={{
                            color: '#b39200',
                            marginBottom: '1rem',
                            fontFamily: "'Fredoka One', cursive"
                        }}
                    >
                        🐾 Newsletter
                    </h4>

                    <p
                        style={{
                            color: 'rgba(0,0,0,0.5)',
                            fontSize: '0.88rem',
                            lineHeight: 1.7,
                            marginBottom: '1rem'
                        }}
                    >
                        Get pet care tips, adoption news, and PawCare updates!
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            gap: '0.5rem'
                        }}
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email..."
                            style={{
                                flex: 1,
                                padding: '0.7rem 0.9rem',
                                borderRadius: '10px',
                                border:
                                    '1px solid rgba(255,107,107,0.15)',
                                outline: 'none',
                                background: 'rgba(255,255,255,0.06)',
                                fontSize: '0.85rem'
                            }}
                        />

                        <button
                            onClick={handleJoin}
                            style={{
                                padding: '0.7rem 1.1rem',
                                borderRadius: '10px',
                                border: 'none',
                                background:
                                    'linear-gradient(135deg,#FF6B6B,#FF8B94)',
                                color: '#fff',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: '0.3s ease'
                            }}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>

            {/* BOTTOM */}
            <div
                style={{
                    marginTop: '2.5rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(255,107,107,0.12)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}
            >
                <p
                    style={{
                        color: 'rgba(0,0,0,0.35)',
                        fontSize: '0.82rem'
                    }}
                >
                    © 2025 PawCare. Made with ❤️ for pets everywhere.
                </p>

                <p
                    style={{
                        color: 'rgba(0,0,0,0.3)',
                        fontSize: '0.82rem'
                    }}
                >
                    Privacy Policy · Terms of Service
                </p>
            </div>
        </footer>
    );
};

export default Footer;