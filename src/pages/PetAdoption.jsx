import React, { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";

import { db } from "../firebase";
import PetCard from '../components/PetCard';
import { Search, Filter } from 'lucide-react';

const PetAdoption = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPets = async () => {

            try {

                const querySnapshot =
                    await getDocs(
                        collection(db, "adoptpets")
                    );

                const petsData =
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                if (petsData.length === 0) {

                    setPets([
                        {
                            id: 1,
                            name: 'Buddy',
                            type: 'Dog',
                            age: 3
                        },
                        {
                            id: 2,
                            name: 'Misty',
                            type: 'Cat',
                            age: 2
                        },
                        {
                            id: 3,
                            name: 'Goldie',
                            type: 'Dog',
                            age: 1
                        }
                    ]);

                } else {

                    setPets(petsData);

                }

                setLoading(false);

            } catch (error) {

                console.error(error);

                setLoading(false);

            }

        };

        fetchPets();

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
