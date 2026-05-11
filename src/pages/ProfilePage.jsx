import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { db } from '../firebase';

import {
    Calendar,
    Search,
    AlertTriangle,
    PawPrint
} from 'lucide-react';

const PET_IMAGES = {
    Dog: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&fit=crop',
    Cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&fit=crop',
    Rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&fit=crop',
    Bird: 'https://images.unsplash.com/photo-1500479694472-551d1fb6258d?w=400&fit=crop',
    Other: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&fit=crop'
};

const ProfilePage = () => {

    const username = localStorage.getItem('username');

    const [loading, setLoading] = useState(true);

    const [pets, setPets] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [lostReports, setLostReports] = useState([]);
    const [accidents, setAccidents] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            const petsSnapshot =
                await getDocs(collection(db, 'pets'));

            const bookingsSnapshot =
                await getDocs(collection(db, 'consultations'));

            const lostSnapshot =
                await getDocs(collection(db, 'lostfound'));

            const accidentsSnapshot =
                await getDocs(collection(db, 'accidents'));

            setPets(
                petsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            );

            setBookings(
                bookingsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            );

            setLostReports(
                lostSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            );

            setAccidents(
                accidentsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
            );

            setLoading(false);

        } catch (error) {

            console.error(error);

        }

    };

    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70vh',
                    fontSize: '2rem'
                }}
            >
                🐾 Loading...
            </div>
        );
    }

    return (

        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}
        >

            {/* HERO SECTION */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{
                    padding: '2.5rem',
                    borderRadius: '28px',
                    background:
                        'linear-gradient(135deg, rgba(255,107,107,0.12), rgba(78,205,196,0.08))',
                    border: '1px solid rgba(255,107,107,0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}
            >

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                >

                    <div
                        style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            background:
                                'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            color: 'white',
                            fontWeight: 900
                        }}
                    >
                        {username?.[0]?.toUpperCase()}
                    </div>

                    <div>
                        <p
                            style={{
                                color: '#4ECDC4',
                                fontWeight: 800,
                                letterSpacing: '1px',
                                marginBottom: '0.4rem'
                            }}
                        >
                            PAWCARE MEMBER
                        </p>

                        <h1
                            style={{
                                fontSize: '2.2rem',
                                margin: 0
                            }}
                        >
                            {username} 🐾
                        </h1>

                        <p style={{ color: 'rgba(0,0,0,0.5)' }}>
                            Your complete pet care dashboard.
                        </p>
                    </div>

                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap'
                    }}
                >

                    {[
                        {
                            label: 'Pets',
                            value: pets.length,
                            color: '#FF6B6B'
                        },
                        {
                            label: 'Bookings',
                            value: bookings.length,
                            color: '#4ECDC4'
                        },
                        {
                            label: 'Reports',
                            value: lostReports.length,
                            color: '#EF4444'
                        }
                    ].map((item, i) => (

                        <div
                            key={i}
                            style={{
                                padding: '1rem',
                                minWidth: '100px',
                                borderRadius: '18px',
                                background: `${item.color} 11`,
                                border: `1px solid ${item.color} 33`,
                                textAlign: 'center'
                            }}
                        >

                            <div
                                style={{
                                    fontSize: '1.8rem',
                                    fontWeight: 900,
                                    color: item.color
                                }}
                            >
                                {item.value}
                            </div>

                            <div
                                style={{
                                    fontSize: '0.8rem',
                                    color: 'rgba(0,0,0,0.5)',
                                    fontWeight: 700
                                }}
                            >
                                {item.label}
                            </div>

                        </div>

                    ))}

                </div>

            </motion.div>

            {/* PETS */}

            <div>

                <h2
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                    }}
                >
                    <PawPrint />
                    My Pets
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fill,minmax(220px,1fr))',
                        gap: '1rem'
                    }}
                >

                    {pets.map((pet) => (

                        <motion.div
                            key={pet.id}
                            whileHover={{ y: -4 }}
                            className="glass-card"
                            style={{
                                borderRadius: '22px',
                                overflow: 'hidden'
                            }}
                        >

                            <img
                                src={PET_IMAGES[pet.petType] || PET_IMAGES.Other}
                                alt={pet.petName}
                                style={{
                                    width: '100%',
                                    height: '180px',
                                    objectFit: 'cover'
                                }}
                            />

                            <div style={{ padding: '1rem' }}>

                                <h3 style={{ color: '#FF6B6B' }}>
                                    {pet.petName}
                                </h3>

                                <p>{pet.petBreed}</p>

                                <p>
                                    {pet.petType} · {pet.petAge} years
                                </p>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

            {/* BOOKINGS */}

            <div className="glass-card" style={{ padding: '2rem' }}>

                <h2
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                    }}
                >
                    <Calendar />
                    Consultation Bookings
                </h2>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >

                    {bookings.map((booking) => (

                        <div
                            key={booking.id}
                            style={{
                                padding: '1rem',
                                borderRadius: '16px',
                                background: 'rgba(78,205,196,0.06)',
                                border:
                                    '1px solid rgba(78,205,196,0.2)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem'
                            }}
                        >

                            <div>
                                <strong>{booking.petType}</strong>
                                <p>📅 {booking.date}</p>
                            </div>

                            <button
                                onClick={async () => {

                                    await deleteDoc(
                                        doc(db, 'consultations', booking.id)
                                    );

                                    fetchData();

                                }}
                                style={{
                                    background: 'rgba(239,68,68,0.15)',
                                    border: 'none',
                                    color: '#EF4444',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 700
                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            {/* LOST REPORTS */}

            <div className="glass-card" style={{ padding: '2rem' }}>

                <h2
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                    }}
                >
                    <Search />
                    Lost & Found Reports
                </h2>

                {lostReports.map((report) => (

                    <div
                        key={report.id}
                        style={{
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '16px',
                            background: 'rgba(239,68,68,0.06)',
                            border:
                                '1px solid rgba(239,68,68,0.2)'
                        }}
                    >

                        <strong>{report.petName}</strong>

                        <p>📍 {report.location}</p>

                    </div>

                ))}

            </div>

            {/* ACCIDENTS */}

            <div className="glass-card" style={{ padding: '2rem' }}>

                <h2
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                    }}
                >
                    <AlertTriangle />
                    Emergency Reports
                </h2>

                {accidents.map((report) => (

                    <div
                        key={report.id}
                        style={{
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '16px',
                            background: 'rgba(255,75,43,0.06)',
                            border:
                                '1px solid rgba(255,75,43,0.2)'
                        }}
                    >

                        <strong>{report.petType}</strong>

                        <p>📍 {report.location}</p>

                        <p>{report.description}</p>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default ProfilePage;



