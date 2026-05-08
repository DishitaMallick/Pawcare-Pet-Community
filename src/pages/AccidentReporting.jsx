import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';
import { AlertTriangle, MapPin, ClipboardList } from 'lucide-react';

const AccidentReporting = () => {
    const [formData, setFormData] = useState({ petType: '', location: '', description: '' });
    const [reported, setReported] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/accidents', formData)
            .then(() => {
                setReported(true);
                setFormData({ petType: '', location: '', description: '' });
            })
            .catch(err => console.error(err));
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <AlertTriangle color="var(--accent)" /> Emergency Reporting
                </h1>
                <p style={{ color: 'var(--glass-text)', marginTop: '0.5rem' }}>Report pet-related accidents to alert local authorities and community members.</p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
                {reported ? (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--secondary)' }}>Report Received</h2>
                        <p style={{ color: 'var(--glass-text)', margin: '1rem 0 2rem' }}>The local community has been alerted. Thank you for your fast action.</p>
                        <button className="btn-primary" onClick={() => setReported(false)}>Report Another Issue</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <FormInput label="Pet Type Involved" placeholder="e.g. Stray Dog, Injured Cat" value={formData.petType} onChange={(e) => setFormData({ ...formData, petType: e.target.value })} required />
                        <FormInput label="Accident Location" placeholder="Street or landmark" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--glass-text)' }}>Description</label>
                            <textarea
                                placeholder="Describe the situation..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', padding: '1rem', borderRadius: '12px', color: 'var(--input-color)', minHeight: '120px', outline: 'none', fontFamily: "'Nunito', sans-serif" }}
                            />
                        </div>
                        <button className="btn-primary" type="submit" style={{ padding: '1rem', marginTop: '1rem', background: 'var(--accent)' }}>Send Urgent Alert</button>
                    </form>
                )}
            </div>

            <div className="glass-card" style={{ display: 'flex', gap: '1rem', padding: '1.5rem', alignItems: 'center', background: 'rgba(255,0,124,0.05)', borderColor: 'rgba(255,0,124,0.2)' }}>
                <ClipboardList color="var(--accent)" />
                <p style={{ fontSize: '0.85rem' }}>Your report will automatically notify the nearest vet clinics and animal welfare groups.</p>
            </div>
        </div>
    );
};

export default AccidentReporting;
