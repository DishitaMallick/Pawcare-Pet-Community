import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../components/FormInput';
import { MapPin, Phone, AlertCircle } from 'lucide-react';

const LostAndFound = () => {
    const navigate = useNavigate();
    const [lostPets, setLostPets] = useState([]);
    const [formData, setFormData] = useState({ petName: '', location: '', contact: '' });

    useEffect(() => {
        fetchLostPets();
    }, []);

    const fetchLostPets = () => {
        axios.get('http://localhost:5000/lost')
            .then(res => setLostPets(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username');
        axios.post('http://localhost:5000/lost', { ...formData, username })
            .then(() => {
                fetchLostPets();
                setFormData({ petName: '', location: '', contact: '' });
                alert('Reported successfully!');
            })
            .catch(err => console.error(err));
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
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
                                <button className="btn-primary" onClick={() => navigate(`/found/${pet.id || Math.random()}`, { state: { pet } })} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>I found it!</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LostAndFound;
