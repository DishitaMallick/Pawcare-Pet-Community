import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Heart, Plus, X, AlertCircle, MessageSquare, Briefcase } from 'lucide-react';

// ─── Decode JWT (no library needed) ─────────────────────────
function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch { return null; }
}

// ─── Pet type emoji map ──────────────────────────────────────
const PET_EMOJI = { Dog: '🐶', Cat: '🐱', Bird: '🦜', Rabbit: '🐰', Fish: '🐟', Hamster: '🐹', Other: '🐾' };
const PET_IMAGES = {
    Dog:    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&fit=crop',
    Cat:    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&fit=crop',
    Bird:   'https://images.unsplash.com/photo-1500479694472-551d1fb6258d?w=300&fit=crop',
    Rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&fit=crop',
    Other:  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&fit=crop',
};

// ─── Add Pet Modal ───────────────────────────────────────────
const AddPetModal = ({ username, onClose, onAdded }) => {
    const [form, setForm] = useState({ petName: '', petType: 'Dog', petAge: '', petBreed: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.petName.trim()) return alert('Pet name is required!');
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/profile/pet', { username, ...form });
            onAdded();
            onClose();
        } catch (err) {
            alert('Failed to add pet: ' + (err.response?.data?.error || err.message));
        } finally { setLoading(false); }
    };

    const inputStyle = {
        width: '100%', padding: '0.75rem 1rem',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,107,107,0.25)',
        borderRadius: '12px', color: '#000000',
        fontSize: '0.9rem', outline: 'none',
        fontFamily: "'Nunito', sans-serif",
        transition: 'border-color 0.2s ease'
    };

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                    background: 'rgba(22,33,62,0.98)',
                    border: '1px solid rgba(255,107,107,0.3)',
                    borderRadius: '24px',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '420px',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.4rem', color: '#FF6B6B' }}>🐾 Add Your Pet</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.5)', fontSize: '1.3rem' }}>✕</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)', display: 'block', marginBottom: '0.4rem' }}>Pet Name *</label>
                        <input style={inputStyle} placeholder="e.g. Buddy" value={form.petName} onChange={e => setForm({ ...form, petName: e.target.value })} required />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)', display: 'block', marginBottom: '0.4rem' }}>Pet Type *</label>
                        <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.petType} onChange={e => setForm({ ...form, petType: e.target.value })}>
                            {Object.keys(PET_EMOJI).map(t => <option key={t} value={t}>{PET_EMOJI[t]} {t}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                        <div>
                            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)', display: 'block', marginBottom: '0.4rem' }}>Age (years)</label>
                            <input style={inputStyle} type="number" min="0" max="30" placeholder="e.g. 2" value={form.petAge} onChange={e => setForm({ ...form, petAge: e.target.value })} />
                        </div>
                        <div>
                            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)', display: 'block', marginBottom: '0.4rem' }}>Breed</label>
                            <input style={inputStyle} placeholder="e.g. Labrador" value={form.petBreed} onChange={e => setForm({ ...form, petBreed: e.target.value })} />
                        </div>
                    </div>
                    <button
                        type="submit" disabled={loading}
                        style={{
                            background: 'linear-gradient(135deg, #FF6B6B, #FF8B94)',
                            border: 'none', padding: '0.9rem', borderRadius: '14px',
                            color: '#000000', fontWeight: 800, fontSize: '0.95rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontFamily: "'Nunito', sans-serif",
                            opacity: loading ? 0.7 : 1,
                            boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
                            marginTop: '0.5rem'
                        }}
                    >
                        {loading ? '⏳ Adding...' : '🐾 Add Pet to Profile'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

// ─── Pet Card ────────────────────────────────────────────────
const UserPetCard = ({ pet }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4 }}
        style={{
            background: 'rgba(255,107,107,0.06)',
            border: '1px solid rgba(255,107,107,0.2)',
            borderRadius: '20px',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
        }}
    >
        <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
            <img
                src={PET_IMAGES[pet.petType] || PET_IMAGES.Other}
                alt={pet.petName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5))' }} />
            <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 700 }}>
                {PET_EMOJI[pet.petType] || '🐾'} {pet.petType}
            </div>
        </div>
        <div style={{ padding: '0.9rem 1rem' }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.1rem', color: '#FF6B6B', marginBottom: '0.2rem' }}>{pet.petName}</div>
            {(pet.petBreed || pet.petAge) && (
                <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.5)', display: 'flex', gap: '0.5rem' }}>
                    {pet.petBreed && <span>🐾 {pet.petBreed}</span>}
                    {pet.petAge && <span>· {pet.petAge} yr{pet.petAge !== 1 ? 's' : ''}</span>}
                </div>
            )}
        </div>
    </motion.div>
);

// ─── Activity Item ───────────────────────────────────────────
const ActivityItem = ({ emoji, label, sub, color, time }) => (
    <div className="activity-item">
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}22`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
            {emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-color)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.45)' }}>{sub}</div>
        </div>
        {time && <div style={{ fontSize: '0.72rem', color: 'rgba(0,0,0,0.35)', flexShrink: 0 }}>{time}</div>}
    </div>
);

// ─── Main Profile Page ───────────────────────────────────────
const ProfilePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [username, setUsername] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddPet, setShowAddPet] = useState(false);
    const [activeTab, setActiveTab] = useState('pets');
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (!token) { navigate('/login'); return; }
        const decoded = decodeToken(token);
        if (!decoded) { navigate('/login'); return; }

        // We need the username — try to get it from localStorage (set at login)
        const storedUser = localStorage.getItem('username');
        const uname = storedUser || `user${decoded.id}`;
        setUsername(uname);

        axios.get(`http://localhost:5000/profile/${uname}`)
            .then(res => { setProfileData(res.data); setLoading(false); })
            .catch(() => {
                // Profile might not exist yet — show empty state
                setProfileData({ user: { username: uname }, bookings: [], lostReports: [], userPets: [] });
                setLoading(false);
            });
    }, [token, refresh]);

    if (!token) return null;

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '3rem', animation: 'pawBounce 1.5s ease-in-out infinite' }}>🐾</div>
            <p style={{ color: 'rgba(0,0,0,0.5)', fontWeight: 700 }}>Loading your profile...</p>
        </div>
    );

    const { user, bookings = [], lostReports = [], userPets = [], adoptions = [] } = profileData || {};

    const tabs = [
        { key: 'pets',      label: 'My Pets',      emoji: '🐾', count: userPets.length },
        { key: 'adoptions', label: 'Adoptions',    emoji: '🏡', count: adoptions.length },
        { key: 'bookings',  label: 'Bookings',      emoji: '📅', count: bookings.length },
        { key: 'lost',      label: 'Lost & Found',  emoji: '🔍', count: lostReports.length },
    ];

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <AnimatePresence>
                {showAddPet && (
                    <AddPetModal
                        username={username}
                        onClose={() => setShowAddPet(false)}
                        onAdded={() => setRefresh(r => r + 1)}
                    />
                )}
            </AnimatePresence>

            {/* ─── Profile Hero ─── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'linear-gradient(135deg, rgba(255,107,107,0.12), rgba(78,205,196,0.08))',
                    border: '1px solid rgba(255,107,107,0.2)',
                    borderRadius: '28px',
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background decoration */}
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,230,109,0.1), transparent)', pointerEvents: 'none' }} />

                {/* Avatar */}
                <div style={{
                    width: '100px', height: '100px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '3rem', flexShrink: 0,
                    boxShadow: '0 8px 32px rgba(255,107,107,0.4)',
                    border: '4px solid rgba(255,255,255,0.15)'
                }}>
                    {username?.[0]?.toUpperCase() || '🐾'}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4ECDC4', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>PawCare Member</div>
                    <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '2rem', color: '#000000', marginBottom: '0.3rem' }}>
                        {user?.username || username} 🐾
                    </h1>
                    {user?.phone && (
                        <div style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)' }}>📞 {user.phone}</div>
                    )}
                    {/* Quick stats */}
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Pets', value: userPets.length, emoji: '🐾', color: '#FF6B6B' },
                            { label: 'Bookings', value: bookings.length, emoji: '📅', color: '#4ECDC4' },
                            { label: 'Reports', value: lostReports.length, emoji: '🔍', color: '#EF4444' },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1.5rem', color: s.color }}>{s.value}</div>
                                <div style={{ fontSize: '0.72rem', color: 'rgba(0,0,0,0.45)', fontWeight: 600 }}>{s.emoji} {s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setShowAddPet(true)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: 'linear-gradient(135deg, #FF6B6B, #FF8B94)',
                            border: 'none', padding: '0.65rem 1.2rem', borderRadius: '12px',
                            color: '#000000', fontWeight: 700, cursor: 'pointer',
                            fontSize: '0.88rem', fontFamily: "'Nunito', sans-serif",
                            boxShadow: '0 4px 16px rgba(255,107,107,0.4)'
                        }}
                    >
                        <Plus size={16} /> Add Pet
                    </button>
                    <button
                        onClick={() => navigate('/chatbot')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: 'rgba(78,205,196,0.15)', border: '1px solid rgba(78,205,196,0.35)',
                            padding: '0.65rem 1.2rem', borderRadius: '12px', color: '#4ECDC4',
                            fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem',
                            fontFamily: "'Nunito', sans-serif"
                        }}
                    >
                        <MessageSquare size={16} /> Ask PawBot
                    </button>
                </div>
            </motion.div>

            {/* ─── Tabs ─── */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {tabs.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        style={{
                            padding: '0.6rem 1.2rem', borderRadius: '12px', border: 'none',
                            fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '0.9rem',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                            transition: 'all 0.2s ease',
                            background: activeTab === t.key
                                ? 'linear-gradient(135deg, #FF6B6B, #FF8B94)'
                                : 'rgba(255,255,255,0.06)',
                            color: activeTab === t.key ? 'white' : 'rgba(255,255,255,0.6)',
                            boxShadow: activeTab === t.key ? '0 4px 16px rgba(255,107,107,0.4)' : 'none',
                        }}
                    >
                        {t.emoji} {t.label}
                        <span style={{
                            background: activeTab === t.key ? 'rgba(255,255,255,0.25)' : 'rgba(255,107,107,0.2)',
                            color: activeTab === t.key ? 'white' : '#FF6B6B',
                            borderRadius: '999px', padding: '0.1rem 0.5rem', fontSize: '0.72rem', fontWeight: 800
                        }}>{t.count}</span>
                    </button>
                ))}
            </div>

            {/* ─── Tab Content ─── */}
            <AnimatePresence mode="wait">

                {/* MY PETS TAB */}
                {activeTab === 'pets' && (
                    <motion.div key="pets" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        {userPets.length === 0 ? (
                            <div style={{
                                textAlign: 'center', padding: '4rem 2rem',
                                background: 'rgba(255,255,255,0.04)',
                                border: '2px dashed rgba(255,107,107,0.2)',
                                borderRadius: '24px'
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐾</div>
                                <h3 style={{ fontFamily: "'Fredoka One', cursive", color: '#FF6B6B', marginBottom: '0.5rem' }}>No pets yet!</h3>
                                <p style={{ color: 'rgba(0,0,0,0.45)', marginBottom: '1.5rem' }}>Add your furry, feathery, or scaly friend to your profile.</p>
                                <button
                                    onClick={() => setShowAddPet(true)}
                                    className="btn-primary"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <Plus size={16} /> Add My First Pet
                                </button>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                                    <h2 style={{ fontFamily: "'Fredoka One', cursive", color: '#FF6B6B', fontSize: '1.3rem' }}>Your Pets ({userPets.length})</h2>
                                    <button
                                        onClick={() => setShowAddPet(true)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                                            background: 'rgba(255,107,107,0.12)', border: '1px solid rgba(255,107,107,0.3)',
                                            borderRadius: '10px', padding: '0.5rem 1rem',
                                            color: '#FF6B6B', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem',
                                            fontFamily: "'Nunito', sans-serif"
                                        }}
                                    >
                                        <Plus size={14} /> Add Pet
                                    </button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                                    {userPets.map(pet => <UserPetCard key={pet.id} pet={pet} />)}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {/* BOOKINGS TAB */}
                {activeTab === 'bookings' && (
                    <motion.div key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        {bookings.length === 0 ? (
                            <div style={{
                                textAlign: 'center', padding: '4rem 2rem',
                                background: 'rgba(255,255,255,0.04)',
                                border: '2px dashed rgba(78,205,196,0.2)',
                                borderRadius: '24px'
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
                                <h3 style={{ fontFamily: "'Fredoka One', cursive", color: '#4ECDC4', marginBottom: '0.5rem' }}>No bookings yet!</h3>
                                <p style={{ color: 'rgba(0,0,0,0.45)', marginBottom: '1.5rem' }}>Book a vet appointment or vaccination session.</p>
                                <button onClick={() => navigate('/vaccination')} className="btn-secondary" style={{ color: '#1a1a2e', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} /> Book Now
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <h2 style={{ fontFamily: "'Fredoka One', cursive", color: '#4ECDC4', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Your Bookings</h2>
                                {bookings.map((b, i) => (
                                    <motion.div
                                        key={b.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        style={{
                                            background: 'rgba(78,205,196,0.06)',
                                            border: '1px solid rgba(78,205,196,0.2)',
                                            borderRadius: '16px',
                                            padding: '1rem 1.2rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(78,205,196,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>💉</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#4ECDC4' }}>{b.clinic}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)', marginTop: '0.1rem' }}>
                                                🐾 {b.petName} · 📅 {b.date}
                                            </div>
                                        </div>
                                            <span style={{ padding: '0.2rem 0.7rem', background: 'rgba(78,205,196,0.15)', border: '1px solid rgba(78,205,196,0.3)', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, color: '#4ECDC4' }}>
                                                Confirmed ✓
                                            </span>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to cancel this booking?')) {
                                                        axios.delete(`http://localhost:5000/bookings/${b.id}`)
                                                            .then(() => setRefresh(prev => prev + 1))
                                                            .catch(err => console.error(err));
                                                    }
                                                }}
                                                style={{ padding: '0.3rem 0.6rem', border: 'none', background: 'rgba(239,68,68,0.15)', borderRadius: '8px', color: '#EF4444', fontWeight: 700, cursor: 'pointer', fontSize: '0.75rem', fontFamily: "'Nunito', sans-serif" }}
                                            >
                                                Cancel
                                            </button>
                                    </motion.div>
                                ))}
                                <button onClick={() => navigate('/vaccination')} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px dashed rgba(78,205,196,0.3)', borderRadius: '10px', padding: '0.5rem 1rem', color: '#4ECDC4', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', fontFamily: "'Nunito', sans-serif', marginTop: '0.3rem" }}>
                                    <Plus size={14} /> Book Another
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
                {/* ADOPTIONS TAB */}
                {activeTab === 'adoptions' && (
                    <motion.div key="adoptions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        {adoptions.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.04)', border: '2px dashed #D4A017', borderRadius: '24px' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏡</div>
                                <h3 style={{ fontFamily: "'Fredoka One', cursive", color: 'var(--accent)', marginBottom: '0.5rem' }}>No adoptions yet!</h3>
                                <p style={{ color: 'var(--glass-text)', marginBottom: '1.5rem' }}>Find your new best friend.</p>
                                <button onClick={() => navigate('/adopt')} className="btn-primary" style={{ background: 'var(--accent)', color: '#1a1a1a', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>View Pets</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <h2 style={{ fontFamily: "'Fredoka One', cursive", color: 'var(--accent)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Your Adopted Pets</h2>
                                {adoptions.map((a, i) => (
                                    <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                        style={{ background: 'rgba(255,230,109,0.06)', border: '1px solid rgba(255,230,109,0.3)', borderRadius: '16px', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ fontSize: '2rem' }}>{PET_EMOJI[a.petType] || '🐾'}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent)' }}>{a.petName}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)' }}>Adopted on {a.date}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* LOST & FOUND TAB */}
                {activeTab === 'lost' && (
                    <motion.div key="lost" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                         {lostReports.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.04)', border: '2px dashed #EF4444', borderRadius: '24px' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                                <h3 style={{ fontFamily: "'Fredoka One', cursive", color: '#EF4444', marginBottom: '0.5rem' }}>No lost reports!</h3>
                                <p style={{ color: 'var(--glass-text)', marginBottom: '1.5rem' }}>Create an alert if you lost a pet.</p>
                                <button onClick={() => navigate('/lost-found')} className="btn-primary" style={{ background: '#EF4444', color: '#000000', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>Report Lost Pet</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <h2 style={{ fontFamily: "'Fredoka One', cursive", color: '#EF4444', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Your Active Pet Alerts</h2>
                                {lostReports.map((r, i) => (
                                    <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                        style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '16px', padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ fontSize: '2rem' }}>🚨</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#EF4444' }}>Missing: {r.petName}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)' }}>Last seen: {r.location}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Quick Navigation Footer */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '2rem' }}>
                    <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '1rem', color: 'rgba(0,0,0,0.5)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Quick Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.8rem' }}>
                        {[
                            { emoji: '🐶', label: 'Adopt a Pet',         path: '/adopt',      color: '#FF6B6B' },
                            { emoji: '🔍', label: 'Report Lost',         path: '/lost-found', color: '#EF4444' },
                            { emoji: '💉', label: 'Book Vet',            path: '/vaccination', color: '#4ECDC4' },
                            { emoji: '🗺️', label: 'Explore Map',         path: '/map',        color: '#F59E0B' },
                        ].map((action, i) => (
                            <button
                                key={i} onClick={() => navigate(action.path)}
                                style={{ padding: '0.8rem', borderRadius: '14px', background: `${action.color}11`, border: `1px solid ${action.color}33`, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>{action.emoji}</span>
                                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: action.color }}>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

            </AnimatePresence>
        </div>
    );
};

export default ProfilePage;
