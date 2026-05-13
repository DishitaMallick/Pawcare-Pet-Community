import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";

import { db } from "../firebase";
import FormInput from '../components/FormInput';
import { MapPin, Phone, AlertCircle } from 'lucide-react';

const LostAndFound = () => {
    const navigate = useNavigate();
    const [lostPets, setLostPets] = useState([]);
    const [formData, setFormData] = useState({ petName: '', location: '', contact: '' });

    useEffect(() => {
        fetchLostPets();
    }, []);

    const fetchLostPets = async () => {

        try {

            const querySnapshot =
                await getDocs(collection(db, "lostfound"));

            const pets = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setLostPets(pets);

        } catch (error) {

            console.error(error);

        }

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const username =
                localStorage.getItem("username");

            await addDoc(collection(db, "lostfound"), {
                ...formData,
                username: localStorage.getItem("username"),
                createdAt: new Date()
            });

            fetchLostPets();

            setFormData({
                petName: "",
                location: "",
                contact: ""
            });

            alert("🐾 Report submitted successfully!");

        } catch (error) {

            console.error(error);
            alert(error.message);

        }

    };
    const handleFound = async (id) => {

        try {

            await deleteDoc(doc(db, "lostfound", id));

            fetchLostPets();

            alert("🐾 Pet marked as found!");

        } catch (error) {

            console.error(error);

        }

    };
    return (
        <div
            style={{
                display: 'grid',

                gridTemplateColumns:
                    window.innerWidth <= 768
                        ? '1fr'
                        : '1fr 1fr',

                gap: '3rem',

                alignItems: 'start'
            }}
        >            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle color="var(--accent)" /> Report a Lost Pet
                </h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Pet Name"
                        placeholder="Enter pet name"
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        required
                    />
                    <FormInput
                        label="Last Seen Location"
                        placeholder="e.g. Central Park"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                    />
                    <FormInput
                        label="Contact Information"
                        placeholder="Phone or email"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        required
                    />
                    <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '1rem' }}>Submit Report</button>
                </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Recent Reports</h2>
                {lostPets.length === 0 ? <p style={{ color: 'var(--glass-text)' }}>No recent reports. Everyone is safe!</p> : (
                    lostPets.map(pet => (
                        <div key={pet.id} className="glass-card" style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: 0 }}>{pet.petName}</h3>
                                <p style={{ color: 'var(--glass-text)', fontSize: '0.85rem', margin: '0.2rem 0' }}>
                                    <MapPin size={14} style={{ marginRight: '4px' }} /> {pet.location}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--secondary)', display: 'block', marginBottom: '0.5rem' }}>
                                    <Phone size={14} style={{ marginRight: '4px' }} /> {pet.contact}
                                </span>
                                <button
                                    className="btn-primary"
                                    onClick={() => handleFound(pet.id)}
                                >
                                    I found it!
                                </button>                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LostAndFound;
