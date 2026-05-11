import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Home,
    Dog,
    MapPin,
    Calendar,
    MessageSquare,
    Briefcase,
    Sun,
    Moon,
    Search,
    User,
    AlertTriangle
} from 'lucide-react';
const PawLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main paw pad */}
        <ellipse cx="18" cy="22" rx="10" ry="8" fill="url(#pawGrad)" />
        {/* Top paw toes */}
        <ellipse cx="10" cy="13" rx="3.5" ry="4.5" fill="url(#pawGrad)" />
        <ellipse cx="18" cy="11" rx="3.5" ry="4.5" fill="url(#pawGrad)" />
        <ellipse cx="26" cy="13" rx="3.5" ry="4.5" fill="url(#pawGrad)" />
        {/* Small inner dots on main pad */}
        <circle cx="14" cy="22" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="21" cy="22" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="17.5" cy="27" r="2" fill="rgba(255,255,255,0.3)" />
        <defs>
            <linearGradient id="pawGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#FF8B94" />
            </linearGradient>
        </defs>
    </svg>
);

const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/adopt', icon: Dog, label: 'Adopt' },
    { to: '/lost-found', icon: Search, label: 'Lost & Found' },
    { to: '/map', icon: MapPin, label: 'Map' },
    { to: '/services', icon: Briefcase, label: 'Services' },
    { to: '/chatbot', icon: MessageSquare, label: 'PawBot' },
    { to: '/accidents', icon: AlertTriangle, label: 'Emergency' },];

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLightMode, setIsLightMode] = useState(() => localStorage.getItem('theme') === 'light-mode');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (isLightMode) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    }, [isLightMode]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <nav style={{
            margin: '0.75rem 1rem',
            padding: '0.75rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: '0.75rem',
            zIndex: 1000,
            background: scrolled ? 'rgba(26, 26, 46, 0.95)' : 'rgba(26, 26, 46, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,107,107,0.15)',
            borderRadius: '20px',
            boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,107,107,0.1)' : '0 4px 24px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
        }}>
            {/* Logo */}
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                <div style={{
                    width: '44px', height: '44px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,139,148,0.1))',
                    border: '1px solid rgba(255,107,107,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'pawBounce 3s ease-in-out infinite'
                }}>
                    <PawLogo />
                </div>
                <div>
                    <span style={{
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        fontFamily: "'Fredoka One', cursive",
                        background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '0.5px'
                    }}>
                        PawCare
                    </span>
                    <div style={{ fontSize: '0.6rem', color: 'rgba(255,107,107,0.7)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '-2px' }}>
                        Pet Community
                    </div>
                </div>
            </div>

            {/* Nav Links */}
            <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className="nav-link"
                        style={({ isActive }) => ({
                            padding: '0.5rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.88rem',
                            fontWeight: 700,
                            transition: 'all 0.2s ease',
                            background: isActive ? 'linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,139,148,0.1))' : 'transparent',
                            color: isActive ? '#FF6B6B' : 'rgba(255,255,255,0.75)',
                            border: isActive ? '1px solid rgba(255,107,107,0.3)' : '1px solid transparent',
                        })}
                    >
                        <Icon size={16} />
                        {label}
                    </NavLink>
                ))}
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>


                {token ? (
                    <>
                        <button
                            onClick={() => navigate('/profile')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                background: 'rgba(255,230,109,0.1)', border: '1px solid rgba(255,230,109,0.3)',
                                padding: '0.5rem 1rem', borderRadius: '12px',
                                color: '#FFE66D', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem',
                                fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,230,109,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,230,109,0.1)'}
                        >
                            <User size={15} /> My Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'linear-gradient(135deg, rgba(78,205,196,0.2), rgba(168,230,207,0.1))',
                                border: '1px solid rgba(78,205,196,0.4)',
                                padding: '0.5rem 1.2rem',
                                borderRadius: '12px',
                                color: '#4ECDC4',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontSize: '0.88rem',
                                transition: 'all 0.3s ease',
                                fontFamily: "'Nunito', sans-serif"
                            }}
                            onMouseEnter={e => e.target.style.background = 'rgba(78,205,196,0.3)'}
                            onMouseLeave={e => e.target.style.background = 'linear-gradient(135deg, rgba(78,205,196,0.2), rgba(168,230,207,0.1))'}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/login')}
                        style={{ padding: '0.5rem 1.2rem', fontSize: '0.88rem', borderRadius: '12px' }}
                    >
                        🐾 Get Started
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
