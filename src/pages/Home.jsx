import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Zap, Shield, ArrowRight, Star, Users, PawPrint } from 'lucide-react';

const stats = [
    { value: '12K+', label: 'Happy Pets', emoji: '🐾' },
    { value: '3.5K', label: 'Adopted', emoji: '🏠' },
    { value: '98%', label: 'Satisfaction', emoji: '⭐' },
    { value: '24/7', label: 'AI Support', emoji: '🤖' },
];

const features = [
    {
        title: 'Instant Adoption',
        description: 'Find your perfect furry companion through smart matchmaking and verified profiles.',
        icon: '🐶',
        color: '#f81c1cff',
        bg: 'rgba(255,107,107,0.1)',
        border: 'rgba(255,107,107,0.25)',
        path: '/adopt'
    },
    {
        title: 'PawTrack Map',
        description: 'Real-time community-sourced pet tracking and safety alerts for your neighborhood.',
        icon: '🗺️',
        color: '#067069ff',
        bg: 'rgba(78,205,196,0.1)',
        border: 'rgba(78,205,196,0.25)',
        path: '/map'
    },
    {
        title: 'PawBot AI',
        description: 'Get quick, smart answers about health, behavior, and emergency care instantly.',
        icon: '🤖',
        color: '#5d4e01ff',
        bg: 'rgba(255,230,109,0.1)',
        border: 'rgba(255,230,109,0.25)',
        path: '/chatbot'
    },
    {
        title: 'Community Safety',
        description: 'Report lost pets or accidents and alert the entire PawCare neighborhood.',
        icon: '🚨',
        color: '#bc515aff',
        bg: 'rgba(255,139,148,0.1)',
        border: 'rgba(255,139,148,0.25)',
        path: '/lost-found'
    },
];

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>

            {/* ===== HERO ===== */}
            <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '3rem 1rem 2rem', gap: '2rem', overflow: 'hidden' }}>
                {/* Floating decoration blobs */}
                <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,107,0.12), transparent)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(78,205,196,0.1), transparent)', pointerEvents: 'none' }} />

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.4rem 1.2rem',
                        background: 'rgba(255,107,107,0.12)',
                        border: '1px solid rgba(255,107,107,0.3)',
                        borderRadius: '999px',
                        fontSize: '0.82rem', fontWeight: 700, color: '#FF6B6B',
                        letterSpacing: '0.5px', textTransform: 'uppercase'
                    }}
                >
                    🐾 Smart Pet Community Platform
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                        fontFamily: "'Fredoka One', cursive",
                        fontWeight: 400,
                        lineHeight: 1.1,
                        letterSpacing: '0.5px',
                        background: 'linear-gradient(135deg, #ffffff 0%, #FF6B6B 40%, #4ECDC4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        maxWidth: '700px'
                    }}
                >
                    Every Paw Deserves the Best Care 🐾
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ fontSize: '1.15rem', color: 'rgba(0,0,0,0.7)', maxWidth: '560px', lineHeight: 1.7 }}
                >
                    Join thousands of pet lovers. Adopt, track, and protect your pets with AI-powered insights and a caring community.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 }}
                    style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    {token ? (
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/services')}
                            style={{ padding: '0.9rem 2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            ✨ Explore Services <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/login')}
                            style={{ padding: '0.9rem 2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            🐾 Get Started Free <ArrowRight size={18} />
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/map')}
                        style={{
                            padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 700,
                            background: 'rgba(78,205,196,0.12)',
                            border: '1px solid rgba(78,205,196,0.35)',
                            borderRadius: '12px', color: '#4ECDC4',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                            transition: 'all 0.3s ease', fontFamily: "'Nunito', sans-serif"
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(78,205,196,0.22)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(78,205,196,0.12)'}
                    >
                        🗺️ Explore Map
                    </button>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}
                >
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            padding: '0.8rem 1.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            textAlign: 'center',
                            minWidth: '100px'
                        }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.1rem' }}>{s.emoji}</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: "'Fredoka One', cursive", color: '#FF6B6B' }}>{s.value}</div>
                            <div style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.55)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* ===== FEATURES GRID ===== */}
            <section>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                        style={{ marginBottom: '0.5rem' }}
                    >
                        Everything Your Pet Needs 🐾
                    </motion.h2>
                    <p style={{ color: 'rgba(0,0,0,0.55)', fontSize: '1rem' }}>A full-featured platform built with love for pet owners</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                    {features.map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => navigate(feat.path)}
                            style={{
                                background: feat.bg,
                                border: `1px solid ${feat.border}`,
                                borderRadius: '20px',
                                padding: '2rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                minHeight: '320px'
                            }}
                            whileHover={{ y: -6, scale: 1.01 }}
                        >
                            <div style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>{feat.icon}</div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: feat.color, marginBottom: '0.5rem', fontFamily: "'Fredoka One', cursive" }}>{feat.title}</h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'rgba(0,0,0,0.65)',
                                lineHeight: 1.6,
                                flexGrow: 1
                            }}>{feat.description}</p>
                            <div style={{
                                marginTop: 'auto',
                                paddingTop: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                color: feat.color,
                                fontSize: '0.85rem',
                                fontWeight: 700
                            }}>
                                Learn more <ArrowRight size={14} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    borderRadius: '28px',
                    background: 'linear-gradient(135deg, rgba(255,107,107,0.12) 0%, rgba(78,205,196,0.12) 100%)',
                    border: '1px solid rgba(255,107,107,0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,230,109,0.12), transparent)', pointerEvents: 'none' }} />
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠🐾❤️</div>
                <h2 style={{ fontSize: '2.2rem', fontFamily: "'Fredoka One', cursive", marginBottom: '0.8rem', color: '#000000' }}>
                    Ready to Give a Pet a Home?
                </h2>
                <p style={{ color: 'rgba(0,0,0,0.6)', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                    Over 12,000 happy pets and their families trust PawCare every single day. Join our community!
                </p>
                {token ? (
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/map')}
                        style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
                    >
                        🗺️ Explore the Community
                    </button>
                ) : (
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/login')}
                        style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
                    >
                        🐾 Join PawCare Free
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default Home;
