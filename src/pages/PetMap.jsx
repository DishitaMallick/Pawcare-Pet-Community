import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import { motion } from 'framer-motion';

const PetMap = () => {
    const [fetchedPets, setFetchedPets] = useState([]);

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:5000/lost'),
            axios.get('http://localhost:5000/pets')
        ]).then(([lostRes, petsRes]) => {
            const lost = lostRes.data.map(p => ({ ...p, isLost: true }));
            const friendly = petsRes.data.map(p => ({ ...p, isLost: false }));
            setFetchedPets([...lost, ...friendly]);
        }).catch(err => console.error(err));
    }, []);

    const stats = [
        { emoji: '🏥', value: '4', label: 'Vet Centres Nearby', color: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
        { emoji: '🎪', value: '4', label: 'Pet Events This Month', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)' },
        { emoji: '🐾', value: fetchedPets.filter(p => !p.isLost).length.toString(), label: 'Community Pets', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
        { emoji: '🚨', value: fetchedPets.filter(p => p.isLost).length.toString(), label: 'Active Lost Alerts', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 1rem', background: 'rgba(78,205,196,0.12)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--secondary)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                    🗺️ Live Community Map
                </div>
                <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '2.4rem', background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.4rem' }}>
                    PawCare Neighbourhood Map
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Find nearby vet clinics 🏥, pet events 🎪, community pets 🐾, and lost pet alerts 🚨. Click any marker for details!
                </p>
            </motion.div>

            {/* Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        style={{
                            background: s.bg,
                            border: `1px solid ${s.border}`,
                            borderRadius: '16px',
                            padding: '1rem 1.2rem',
                            display: 'flex', alignItems: 'center', gap: '0.8rem'
                        }}
                    >
                        <span style={{ fontSize: '1.8rem' }}>{s.emoji}</span>
                        <div>
                            <div style={{ fontSize: '1.6rem', fontFamily: "'Fredoka One', cursive", color: s.color, lineHeight: 1 }}>{s.value}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.1rem' }}>{s.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Map */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    padding: 0
                }}
            >
                <MapComponent petsNearby={fetchedPets} />
            </motion.div>

            {/* Tips */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                    { emoji: '🏥', tip: 'Click vet markers to see clinic hours, services, and call directly.', color: '#10B981' },
                    { emoji: '🎪', tip: 'Click event markers to see date, venue, and register interest.', color: '#8B5CF6' },
                    { emoji: '🗺️', tip: 'Use the layer legend (top-right) to toggle marker types on/off.', color: '#4ECDC4' },
                ].map((t, i) => (
                    <div key={i} style={{ padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '16px', display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{t.emoji}</span>
                        <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.tip}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetMap;
