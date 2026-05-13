import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Home,
    Dog,
    MapPin,
    MessageSquare,
    Briefcase,
    Search,
    AlertTriangle,
    Menu,
    X
} from 'lucide-react';

const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/adopt', icon: Dog, label: 'Adopt' },
    { to: '/lost-found', icon: Search, label: 'Lost & Found' },
    { to: '/services', icon: Briefcase, label: 'Services' },
    { to: '/chatbot', icon: MessageSquare, label: 'PawBot' },
    { to: '/accidents', icon: AlertTriangle, label: 'Emergency' }
];

const Navbar = () => {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 768
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () =>
            window.removeEventListener(
                'resize',
                handleResize
            );
    }, []);

    return (
        <nav
            style={{
                margin: isMobile
                    ? '0.5rem'
                    : '0.75rem 1rem',

                padding: isMobile
                    ? '0.7rem 1rem'
                    : '0.9rem 1.5rem',

                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',

                position: 'sticky',
                top: '0.5rem',
                zIndex: 1000,

                background: 'rgba(26,26,46,0.92)',

                backdropFilter: 'blur(20px)',

                border:
                    '1px solid rgba(255,107,107,0.12)',

                borderRadius: '18px'
            }}
        >
            {/* LOGO */}
            <div
                onClick={() => navigate('/')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer'
                }}
            >
                <div
                    style={{
                        width: isMobile ? '34px' : '44px',
                        height: isMobile ? '34px' : '44px',

                        borderRadius: '12px',

                        background:
                            'linear-gradient(135deg, rgba(255,107,107,0.2), rgba(255,139,148,0.1))',

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        color: '#FF6B6B',

                        fontSize: isMobile
                            ? '1rem'
                            : '1.3rem'
                    }}
                >
                    🐾
                </div>

                <div>
                    <div
                        style={{
                            fontSize: isMobile
                                ? '1rem'
                                : '1.4rem',

                            fontWeight: 800,

                            color: '#FF6B6B'
                        }}
                    >
                        PawCare
                    </div>

                    {!isMobile && (
                        <div
                            style={{
                                fontSize: '0.65rem',
                                color: '#aaa'
                            }}
                        >
                            Pet Community
                        </div>
                    )}
                </div>
            </div>

            {/* DESKTOP NAV */}
            {!isMobile && (
                <div
                    style={{
                        display: 'flex',
                        gap: '0.3rem',
                        alignItems: 'center'
                    }}
                >
                    {navItems.map(
                        ({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',

                                    padding: '0.55rem 0.8rem',

                                    borderRadius: '12px',

                                    textDecoration: 'none',

                                    color: isActive
                                        ? '#FF6B6B'
                                        : '#fff',

                                    background: isActive
                                        ? 'rgba(255,107,107,0.12)'
                                        : 'transparent',

                                    fontSize: '0.9rem'
                                })}
                            >
                                <Icon size={16} />
                                {label}
                            </NavLink>
                        )
                    )}
                </div>
            )}

            {/* HAMBURGER */}
            {isMobile && (
                <button
                    onClick={() =>
                        setMenuOpen(!menuOpen)
                    }
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer'
                    }}
                >
                    {menuOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>
            )}

            {/* MOBILE MENU */}
            {menuOpen && isMobile && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,

                        marginTop: '0.5rem',

                        background:
                            'rgba(26,26,46,0.98)',

                        borderRadius: '18px',

                        padding: '1rem',

                        display: 'flex',
                        flexDirection: 'column',

                        gap: '0.7rem',

                        border:
                            '1px solid rgba(255,107,107,0.12)'
                    }}
                >
                    {navItems.map(
                        ({ to, icon: Icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',

                                    gap: '0.8rem',

                                    padding: '0.8rem',

                                    borderRadius: '12px',

                                    textDecoration: 'none',

                                    color: '#fff',

                                    background:
                                        'rgba(255,255,255,0.04)'
                                }}
                            >
                                <Icon size={18} />
                                {label}
                            </NavLink>
                        )
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;