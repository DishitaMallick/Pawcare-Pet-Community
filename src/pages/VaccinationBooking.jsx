import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';
import { Calendar, Syringe, MapPin, CheckCircle } from 'lucide-react';

const VaccinationBooking = () => {
    const [formData, setFormData] = useState({ ownerName: '', petName: '', clinic: '', date: '' });
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username');
        axios.post('http://localhost:5000/bookings', { ...formData, username })
            .then(() => {
                setSuccess(true);
                setFormData({ ownerName: '', petName: '', clinic: '', date: '' });
            })
            .catch(err => console.error(err));
    };

    if (success) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
                    <CheckCircle size={64} color="var(--secondary)" style={{ marginBottom: '1.5rem' }} />
                    <h1>Booking Confirmed!</h1>
                    <p style={{ color: 'var(--glass-text)', marginTop: '1rem', marginBottom: '2rem' }}>We've sent the details to your email. See you at the clinic!</p>
                    <button className="btn-primary" onClick={() => setSuccess(false)}>Book Another</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Book a Vaccination</h1>
                <p style={{ color: 'var(--glass-text)' }}>Protect your pet from preventable diseases with verified clinics.</p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <FormInput label="Owner Name" placeholder="Your full name" value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} required />
                    </div>
                    <FormInput label="Pet Name" placeholder="Your pet's name" value={formData.petName} onChange={(e) => setFormData({ ...formData, petName: e.target.value })} required />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--glass-text)', letterSpacing: '0.2px' }}>Select Clinic</label>
                        <select
                            value={formData.clinic}
                            onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                            required
                            style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', padding: '0.8rem 1rem', borderRadius: '12px', color: 'var(--input-color)', outline: 'none', fontSize: '0.9rem', fontFamily: "'Nunito', sans-serif", cursor: 'pointer' }}
                        >
                            <option value="" disabled>Choose a clinic</option>
                            <option value="PawCare Veterinary Clinic">🏥 PawCare Veterinary Clinic</option>
                            <option value="City Pet Hospital">🏥 City Pet Hospital</option>
                            <option value="Happy Paws Animal Clinic">🏥 Happy Paws Animal Clinic</option>
                            <option value="Dr. Mehta's Pet Care">🏥 Dr. Mehta's Pet Care</option>
                        </select>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                        <FormInput label="Appointment Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
                    </div>
                    <button className="btn-primary" type="submit" style={{ gridColumn: 'span 2', padding: '1rem', marginTop: '1rem' }}>Confirm Booking</button>
                </form>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div className="glass-card" style={{ flex: 1, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Syringe size={24} color="var(--primary)" />
                    <span style={{ fontSize: '0.9rem' }}>Rabies & DHPP included</span>
                </div>
                <div className="glass-card" style={{ flex: 1, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Calendar size={24} color="var(--secondary)" />
                    <span style={{ fontSize: '0.9rem' }}>Reminders sent via SMS</span>
                </div>
            </div>
        </div>
    );
};

export default VaccinationBooking;
