import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';
import { Search, Filter } from 'lucide-react';

const PetAdoption = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch pets from backend
        axios.get('http://localhost:5000/pets')
            .then(res => {
                setPets(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
                // Fallback dummy data if backend is not yet seeded
                setPets([
                    { id: 1, name: 'Buddy', type: 'Dog', age: 3 },
                    { id: 2, name: 'Misty', type: 'Cat', age: 2 },
                    { id: 3, name: 'Goldie', type: 'Dog', age: 1 }
                ]);
            });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Find Your New Companion</h1>
                <div style={{ display: 'flex', gap: '1rem', flex: 1, maxWidth: '500px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--glass-text)' }} size={18} />
                        <input
                            placeholder="Search pets..."
                            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 3rem', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '12px', color: 'var(--input-color)', outline: 'none', fontFamily: "'Nunito', sans-serif" }}
                        />
                    </div>
                    <button className="glass-card" style={{ padding: '0.8rem 1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={18} /> Filter
                    </button>
                </div>
            </div>

            {loading ? <p>Loading pets...</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {pets.map(pet => (
                        <PetCard key={pet.id} {...pet} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PetAdoption;
