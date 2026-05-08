import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { Scissors, GraduationCap, Stethoscope, Cookie, X } from 'lucide-react';

const PetServices = () => {
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Professional Pet Services</h1>
                <p style={{ color: 'var(--glass-text)' }}>Everything your furry friend needs to thrive.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <ServiceCard
                    title="Premium Grooming"
                    description="Full spa treatment, hair styling, and hygienic cleaning for all breeds."
                    icon={Scissors}
                    onLearnMore={() => setSelectedService({ title: "Premium Grooming", details: "Our premium grooming service includes a deep cleaning bath, breed-specific haircut, nail trimming, ear cleaning, and a blueberry facial. Walk-ins are welcome!" })}
                />
                <ServiceCard
                    title="Behavioral Training"
                    description="Expert guidance and positive reinforcement training for puppies and adults."
                    icon={GraduationCap}
                    onLearnMore={() => setSelectedService({ title: "Behavioral Training", details: "From basic obedience to advanced behavioral modification. We use positive reinforcement techniques to build a strong bond between you and your pet. Group classes and 1-on-1 sessions available." })}
                />
                <ServiceCard
                    title="Veterinary Care"
                    description="Annual checkups, emergency care, and expert health consultations."
                    icon={Stethoscope}
                    onLearnMore={() => setSelectedService({ title: "Veterinary Care", details: "Our certified vets provide comprehensive health exams, vaccinations, dental care, and 24/7 emergency support. Book an appointment today for peace of mind." })}
                />
                <ServiceCard
                    title="Nutritional Plans"
                    description="Customized diet plans tailored to your pet's age, weight, and activity level."
                    icon={Cookie}
                    onLearnMore={() => setSelectedService({ title: "Nutritional Plans", details: "Ensure your pet gets the nutrients they need. We create specialized diet plans for weight management, allergies, and optimal joint health." })}
                />
            </div>

            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2.5rem' }}>
                <div>
                    <h2>Need a specific service?</h2>
                    <p style={{ color: 'var(--glass-text)', marginTop: '0.5rem' }}>Our team can help you find the right specialist for your pet.</p>
                </div>
                <button className="btn-primary" onClick={() => navigate('/vaccination')} style={{ padding: '1rem 2rem' }}>Book a Consultation</button>
            </div>

            {/* Modal Overlay */}
            {selectedService && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
                    <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '500px', width: '90%', position: 'relative' }}>
                        <button onClick={() => setSelectedService(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-color)', cursor: 'pointer' }}><X size={24} /></button>
                        <h2 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>{selectedService.title}</h2>
                        <p style={{ color: 'var(--text-color)', lineHeight: 1.6, opacity: 0.9 }}>{selectedService.details}</p>
                        <button className="btn-primary" onClick={() => setSelectedService(null)} style={{ marginTop: '2rem', width: '100%' }}>Close Information</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetServices;
