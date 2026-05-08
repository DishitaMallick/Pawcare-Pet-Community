import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, MapPin, Camera, AlertCircle } from 'lucide-react';
import FormInput from '../components/FormInput';
import axios from 'axios';

const FoundStatus = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const pet = location.state?.pet || { petName: 'this pet', location: 'Unknown' };

    const [formData, setFormData] = useState({
        finderName: '',
        contact: '',
        foundLocation: '',
        notes: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate an API call to mark the pet as found and notify the owner
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center' }} className="glass-card">
                <CheckCircle size={64} color="var(--secondary)" style={{ margin: '0 auto 1.5rem' }} />
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Success!</h1>
                <p style={{ color: 'var(--glass-text)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Thank you so much! We have notified the owner of <strong>{pet.petName}</strong> with your contact details. They will reach out to you shortly.
                </p>
                <button className="btn-primary" onClick={() => navigate('/lost-found')} style={{ width: '100%' }}>
                    Return to Lost & Found
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Report Pet Found</h1>
                <p style={{ color: 'var(--glass-text)' }}>You are reporting that you've found <strong>{pet.petName}</strong> (last seen near {pet.location}). Please provide your details so we can connect you with the owner.</p>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle color="var(--secondary)" /> Found Status Details
                </h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <FormInput
                        label="Your Name"
                        placeholder="Enter your full name"
                        value={formData.finderName}
                        onChange={(e) => setFormData({ ...formData, finderName: e.target.value })}
                        required
                    />
                    <FormInput
                        label="Your Contact Number"
                        placeholder="Phone number for the owner to reach you"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        required
                    />
                    <FormInput
                        label="Where did you find them?"
                        placeholder="Specific location, cross streets, or landmark"
                        value={formData.foundLocation}
                        onChange={(e) => setFormData({ ...formData, foundLocation: e.target.value })}
                        required
                    />
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--glass-text)' }}>Additional Notes (Optional)</label>
                        <textarea
                            rows="4"
                            placeholder="Is the pet injured? Are they safe with you?"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '0.95rem', resize: 'vertical' }}
                        />
                    </div>
                    <button className="btn-primary" type="submit" disabled={submitting} style={{ width: '100%', marginTop: '1rem', background: 'linear-gradient(135deg, var(--secondary), #00ff88)' }}>
                        {submitting ? 'Submitting...' : 'Submit Found Report'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FoundStatus;
