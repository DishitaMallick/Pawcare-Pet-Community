import React from 'react';
import { Shield, Smartphone, Heart, Bell } from 'lucide-react';

const ServiceCard = ({ title, description, icon: Icon, onLearnMore }) => {
    return (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ background: 'var(--primary)', padding: '0.8rem', borderRadius: '12px', display: 'flex' }}>
                <Icon size={24} color="#000000" />
            </div>
            <h3>{title}</h3>
            <p style={{ color: 'var(--glass-text)', fontSize: '0.9rem' }}>{description}</p>
            <button onClick={onLearnMore} style={{ background: 'transparent', border: 'none', color: 'var(--secondary)', fontWeight: 600, cursor: 'pointer', padding: 0 }}>Learn More →</button>
        </div>
    );
};

export default ServiceCard;
