import React, { useState } from 'react';
import {
    addDoc,
    collection
} from "firebase/firestore";

import { db } from "../firebase";
import { Heart, CheckCircle, MapPin, Calendar } from 'lucide-react';

const petImages = {
    Dog: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&fit=crop',
    Cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&fit=crop',
};

const PetCard = ({ name, type, age, image }) => {
    const [adopted, setAdopted] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleAdopt = async () => {

        try {

            await addDoc(
                collection(db, "adoptions"),
                {
                    petName: name,
                    petType: type,
                    username:
                        localStorage.getItem("username"),
                    date:
                        new Date().toLocaleDateString()
                }
            );

            setAdopted(true);

            alert("🐾 Adoption successful!");

        } catch (error) {

            alert(error.message);

        }

    };

    if (adopted) {
        return (
            <div className="glass-card" style={{ width: '100%', maxWidth: '300px', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
                <CheckCircle size={56} color="var(--secondary)" />
                <h3 style={{ margin: 0 }}>🎉 Congratulations!</h3>
                <p style={{ color: 'var(--glass-text)', fontSize: '0.9rem' }}>
                    You've successfully adopted <strong>{name}</strong>! Our team will contact you within 24 hours.
                </p>
                <button className="btn-primary" style={{ width: '100%' }} onClick={() => setAdopted(false)}>
                    View Others
                </button>
            </div>
        );
    }

    return (
        <div className="glass-card" style={{ width: '100%', maxWidth: '300px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ width: '100%', height: '200px', borderRadius: '15px', overflow: 'hidden', background: '#222', position: 'relative' }}>
                <img
                    src={image || petImages[type] || `https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&fit=crop`}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                    {type}
                </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{name}</h3>
                <div style={{ display: 'flex', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--glass-text)', alignItems: 'center' }}>
                    <Calendar size={13} /> {age} yr{age !== 1 ? 's' : ''}
                </div>
            </div>
            <p style={{ color: 'var(--glass-text)', fontSize: '0.9rem', flex: 1 }}>
                Healthy &amp; Friendly • Vaccinated • Ready for a loving home
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                    className="btn-primary"
                    style={{ flex: 1 }}
                    onClick={handleAdopt}
                >
                    Adopt Me
                </button>
                <button
                    onClick={() => setLiked(l => !l)}
                    style={{
                        padding: '0.5rem', borderRadius: '10px', border: '1px solid var(--text-color)',
                        background: liked ? 'rgba(255,0,124,0.2)' : 'transparent', cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Heart size={20} color={liked ? 'var(--accent)' : 'var(--text-color)'} fill={liked ? 'var(--accent)' : 'none'} />
                </button>
            </div>
        </div>
    );
};

export default PetCard;
