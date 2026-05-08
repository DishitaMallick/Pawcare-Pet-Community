import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

// ─── Custom Icons ───────────────────────────────────────────
const makeIcon = (emoji, bg, size = 36) => L.divIcon({
    className: '',
    html: `<div style="
        width:${size}px;height:${size}px;border-radius:50%;
        background:${bg};border:3px solid white;
        display:flex;align-items:center;justify-content:center;
        font-size:${size * 0.45}px;
        box-shadow:0 4px 12px rgba(0,0,0,0.3);
        cursor:pointer;
    ">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)]
});

const userIcon = makeIcon('📍', '#3B82F6', 38);
const vetIcon = makeIcon('🏥', '#10B981', 40);
const eventIcon = makeIcon('🎪', '#8B5CF6', 40);
const lostPetIcon = makeIcon('🚨', '#EF4444', 36);
const friendlyIcon = makeIcon('🐾', '#F59E0B', 32);

// ─── Fly to location ────────────────────────────────────────
function FlyToLocation({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) map.flyTo(position, 14, { duration: 1.5 });
    }, [position, map]);
    return null;
}

// ─── Nearby Vet Centres (static realistic data, offset from user) ─
const VET_CENTRES = [
    { name: 'PawCare Veterinary Clinic', phone: '+91 98765 43210', hours: 'Mon–Sat 9am–8pm', services: ['Vaccination', 'Surgery', 'Dental'], rating: 4.8, latOff: 0.012, lngOff: 0.018 },
    { name: 'City Pet Hospital', phone: '+91 91234 56789', hours: 'Open 24/7', services: ['Emergency', 'X-Ray', 'Grooming'], rating: 4.6, latOff: -0.015, lngOff: 0.010 },
    { name: 'Happy Paws Animal Clinic', phone: '+91 87654 32109', hours: 'Mon–Sun 8am–9pm', services: ['Check-up', 'Boarding'], rating: 4.7, latOff: 0.020, lngOff: -0.014 },
    { name: 'Dr. Mehta\'s Pet Care', phone: '+91 76543 21098', hours: 'Mon–Fri 10am–7pm', services: ['Consultation', 'Deworming'], rating: 4.5, latOff: -0.008, lngOff: -0.022 },
];

// ─── Nearby Pet Events ───────────────────────────────────────
const PET_EVENTS = [
    { name: 'PawFest 2026 — City Pet Fair', date: 'Apr 12, 2026', time: '10am – 6pm', venue: 'Central Park Grounds', desc: 'Largest pet fair with adoption stalls, dog shows, grooming demos, and vet check-ups!', type: 'Fair', latOff: 0.025, lngOff: 0.005 },
    { name: 'Puppy Socialization Workshop', date: 'Apr 18, 2026', time: '11am – 1pm', venue: 'Paws & Play Center', desc: 'Free workshop for puppies under 6 months to socialize and learn basic commands.', type: 'Workshop', latOff: -0.020, lngOff: 0.022 },
    { name: 'Community Pet Adoption Drive', date: 'Apr 25, 2026', time: '9am – 5pm', venue: 'Town Hall Lawn', desc: 'Adopt rescued animals, free vaccination for newly adopted pets on the day.', type: 'Adoption', latOff: 0.010, lngOff: -0.025 },
    { name: 'Exotic Birds & Bunny Exhibition', date: 'May 3, 2026', time: '12pm – 7pm', venue: 'Exhibition Hall No. 4', desc: 'Rare bird species, angora rabbits, and exotic pets on display. Family-friendly event.', type: 'Exhibition', latOff: -0.028, lngOff: -0.008 },
];

// ─── Detail Popup Panel ──────────────────────────────────────
const DetailPanel = ({ item, type, onClose }) => {
    if (!item) return null;

    const isVet = type === 'vet';
    const isEvent = type === 'event';

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                zIndex: 2000,

                background:
                    'linear-gradient(135deg, rgba(22,22,40,0.98), rgba(35,35,60,0.96))',

                backdropFilter: 'blur(18px)',

                border: `1px solid ${isVet
                    ? 'rgba(16,185,129,0.35)'
                    : isEvent
                        ? 'rgba(139,92,246,0.35)'
                        : 'rgba(239,68,68,0.35)'
                    }`,

                borderRadius: '24px',

                padding: '1.4rem',

                boxShadow:
                    '0 18px 50px rgba(0,0,0,0.45)',

                animation: 'fadeInUp 0.3s ease',

                maxWidth: '620px',

                margin: '0 auto',

                color: '#ffffff'
            }}
        >
            {/* CLOSE BUTTON */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '14px',
                    right: '16px',

                    background: 'transparent',
                    border: 'none',

                    cursor: 'pointer',

                    fontSize: '1.2rem',

                    color: 'rgba(255,255,255,0.7)',

                    transition: '0.2s ease'
                }}
            >
                ✕
            </button>

            {/* VET DETAILS */}
            {isVet && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <span style={{ fontSize: '1.8rem' }}>
                            🏥
                        </span>

                        <div>
                            <div
                                style={{
                                    fontFamily:
                                        "'Fredoka One', cursive",

                                    fontSize: '1.2rem',

                                    color: '#10B981',

                                    marginBottom: '0.2rem'
                                }}
                            >
                                {item.name}
                            </div>

                            <div
                                style={{
                                    fontSize: '0.82rem',

                                    color:
                                        'rgba(255,255,255,0.72)'
                                }}
                            >
                                ⭐ {item.rating} · {item.hours}
                            </div>
                        </div>
                    </div>

                    {/* SERVICES */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        {item.services.map((service, i) => (
                            <span
                                key={i}
                                style={{
                                    padding:
                                        '0.35rem 0.8rem',

                                    background:
                                        'rgba(16,185,129,0.15)',

                                    border:
                                        '1px solid rgba(16,185,129,0.3)',

                                    borderRadius: '999px',

                                    fontSize: '0.74rem',

                                    fontWeight: 700,

                                    color: '#10B981'
                                }}
                            >
                                {service}
                            </span>
                        ))}
                    </div>

                    {/* PHONE */}
                    <div
                        style={{
                            fontSize: '0.92rem',

                            color: 'rgba(255,255,255,0.9)',

                            marginBottom: '1rem'
                        }}
                    >
                        📞 {item.phone}
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={() =>
                            window.open(
                                `tel:${item.phone.replace(
                                    /\s/g,
                                    ''
                                )}`
                            )
                        }
                        style={{
                            padding: '0.7rem 1.4rem',

                            border: 'none',

                            borderRadius: '14px',

                            background:
                                'linear-gradient(135deg,#10B981,#34D399)',

                            color: '#ffffff',

                            fontWeight: 700,

                            cursor: 'pointer',

                            fontSize: '0.88rem',

                            boxShadow:
                                '0 8px 20px rgba(16,185,129,0.3)'
                        }}
                    >
                        📞 Call Now
                    </button>
                </>
            )}

            {/* EVENT DETAILS */}
            {isEvent && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <span style={{ fontSize: '1.8rem' }}>
                            🎪
                        </span>

                        <div>
                            <div
                                style={{
                                    fontFamily:
                                        "'Fredoka One', cursive",

                                    fontSize: '1.15rem',

                                    color: '#A78BFA',

                                    marginBottom: '0.2rem'
                                }}
                            >
                                {item.name}
                            </div>

                            <div
                                style={{
                                    fontSize: '0.8rem',

                                    color:
                                        'rgba(255,255,255,0.72)'
                                }}
                            >
                                📅 {item.date} · ⏰ {item.time}
                            </div>
                        </div>
                    </div>

                    {/* EVENT TYPE */}
                    <span
                        style={{
                            padding: '0.3rem 0.8rem',

                            background:
                                'rgba(139,92,246,0.15)',

                            border:
                                '1px solid rgba(139,92,246,0.3)',

                            borderRadius: '999px',

                            fontSize: '0.74rem',

                            fontWeight: 700,

                            color: '#C4B5FD',

                            display: 'inline-block',

                            marginBottom: '1rem'
                        }}
                    >
                        {item.type}
                    </span>

                    {/* DESCRIPTION */}
                    <p
                        style={{
                            fontSize: '0.92rem',

                            lineHeight: 1.7,

                            color:
                                'rgba(255,255,255,0.88)',

                            marginBottom: '0.9rem'
                        }}
                    >
                        {item.desc}
                    </p>

                    {/* LOCATION */}
                    <div
                        style={{
                            fontSize: '0.85rem',

                            color:
                                'rgba(255,255,255,0.72)',

                            marginBottom: '1rem'
                        }}
                    >
                        📍 {item.venue}
                    </div>

                    {/* BUTTON */}
                    <button
                        style={{
                            padding: '0.75rem 1.4rem',

                            border: 'none',

                            borderRadius: '14px',

                            background:
                                'linear-gradient(135deg,#8B5CF6,#A78BFA)',

                            color: '#ffffff',

                            fontWeight: 700,

                            cursor: 'pointer',

                            fontSize: '0.88rem',

                            boxShadow:
                                '0 8px 22px rgba(139,92,246,0.35)'
                        }}
                    >
                        🎟️ Register Interest
                    </button>
                </>
            )}
        </div>
    );
};

// ─── Legend ──────────────────────────────────────────────────
const MapLegend = ({ activeFilters, toggleFilter }) => {
    const items = [
        { key: 'user', emoji: '📍', label: 'You', color: '#3B82F6' },
        { key: 'vet', emoji: '🏥', label: 'Vet Centres', color: '#10B981' },
        { key: 'event', emoji: '🎪', label: 'Pet Events', color: '#8B5CF6' },
        { key: 'lost', emoji: '🚨', label: 'Lost Pets', color: '#EF4444' },
        { key: 'friendly', emoji: '🐾', label: 'Community', color: '#F59E0B' },
    ];
    return (
        <div style={{
            position: 'absolute', top: '12px', right: '12px', zIndex: 1001,
            background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(100px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px',
            padding: '0.7rem 0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem',
            minWidth: '140px'
        }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#000000', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Layers</div>
            {items.map(({ key, emoji, label, color }) => (
                <div
                    key={key}
                    onClick={() => key !== 'user' && toggleFilter(key)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        cursor: key !== 'user' ? 'pointer' : 'default',
                        opacity: key !== 'user' && !activeFilters.includes(key) ? 0.4 : 1,
                        transition: 'opacity 0.2s ease', padding: '0.1rem 0'
                    }}
                >
                    <span style={{ fontSize: '1rem' }}>{emoji}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color }}>{label}</span>
                </div>
            ))}
        </div>
    );
};

// ─── Main Component ──────────────────────────────────────────
const MapComponent = ({ petsNearby = [] }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [visiblePets, setVisiblePets] = useState([]);
    const [vets, setVets] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [activeFilters, setActiveFilters] = useState(['vet', 'event', 'lost', 'friendly']);
    const defaultCenter = [20.5937, 78.9629];

    const toggleFilter = (key) => {
        setActiveFilters(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
                err => {
                    console.warn('Geolocation error:', err.message);
                    setLocationError('Showing default view. Enable location for nearby services.');
                },
                { enableHighAccuracy: true, timeout: 8000 }
            );
        } else {
            setLocationError('Geolocation not supported by your browser.');
        }
    }, []);

    useEffect(() => {
        const center = userLocation || defaultCenter;

        // Place vet centres
        setVets(VET_CENTRES.map(v => ({
            ...v, position: [center[0] + v.latOff, center[1] + v.lngOff]
        })));

        // Place pet events
        setEvents(PET_EVENTS.map(e => ({
            ...e, position: [center[0] + e.latOff, center[1] + e.lngOff]
        })));

        // Place community pets
        if (petsNearby.length > 0) {
            setVisiblePets(petsNearby.map(pet => ({
                ...pet,
                position: pet.position || [
                    center[0] + (Math.random() - 0.5) * 0.03,
                    center[1] + (Math.random() - 0.5) * 0.03
                ]
            })));
        }
    }, [userLocation, petsNearby]);

    const handleSelect = (item, type) => {
        setSelectedItem(item);
        setSelectedType(type);
    };

    return (
        <div style={{ position: 'relative' }}>
            {locationError && (
                <div style={{
                    position: 'absolute', top: '0.8rem', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 1000, background: 'rgba(255, 255, 255, 0.75)',
                    color: 'rgba(0,0,0,1)',
                    padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem',
                    whiteSpace: 'nowrap', maxWidth: '90%', textAlign: 'center'
                }}>
                    ⚠️ {locationError}
                </div>
            )}

            <div style={{ height: '520px', width: '100%', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                <MapContainer center={userLocation || defaultCenter} zoom={userLocation ? 14 : 5} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    {userLocation && <FlyToLocation position={userLocation} />}

                    {/* User marker */}
                    {userLocation && (
                        <>
                            <Circle center={userLocation} radius={1500} pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.06, weight: 1 }} />
                            <Marker position={userLocation} icon={userIcon}>
                                <Popup>📍 <strong>Your Location</strong></Popup>
                            </Marker>
                        </>
                    )}

                    {/* Vet Centres */}
                    {activeFilters.includes('vet') && vets.map((vet, i) => (
                        <Marker key={`vet-${i}`} position={vet.position} icon={vetIcon}
                            eventHandlers={{ click: () => handleSelect(vet, 'vet') }}>
                            <Popup>
                                <div style={{ padding: '0.3rem 0.2rem', minWidth: '180px' }}>
                                    <strong style={{ color: '#10B981' }}>🏥 {vet.name}</strong><br />
                                    <small>⭐ {vet.rating} · {vet.hours}</small><br />
                                    <span style={{ color: '#6B7280', fontSize: '0.78rem' }}>Click marker for full details</span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {/* Pet Events */}
                    {activeFilters.includes('event') && events.map((ev, i) => (
                        <Marker key={`ev-${i}`} position={ev.position} icon={eventIcon}
                            eventHandlers={{ click: () => handleSelect(ev, 'event') }}>
                            <Popup>
                                <div style={{ padding: '0.3rem 0.2rem', minWidth: '180px' }}>
                                    <strong style={{ color: '#8B5CF6' }}>🎪 {ev.name}</strong><br />
                                    <small>📅 {ev.date} · {ev.time}</small><br />
                                    <span style={{ color: '#6B7280', fontSize: '0.78rem' }}>Click for details</span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {/* Lost Pets */}
                    {activeFilters.includes('lost') && visiblePets.filter(p => p.isLost).map((pet, i) => (
                        <Marker key={`lost-${i}`} position={pet.position} icon={lostPetIcon}>
                            <Popup>
                                <div style={{ padding: '0.3rem' }}>
                                    🚨 <strong>{pet.petName || pet.name}</strong> was last seen near {pet.location}!<br />
                                    📞 Contact: {pet.contact}
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                    {/* Friendly Pets */}
                    {activeFilters.includes('friendly') && visiblePets.filter(p => !p.isLost).map((pet, i) => (
                        <Marker key={`friendly-${i}`} position={pet.position} icon={friendlyIcon}>
                            <Popup>
                                <div style={{ padding: '0.3rem' }}>
                                    🐾 <strong>{pet.name}</strong> is a {pet.type || 'pet'} in the community!<br />
                                    Owner: {pet.ownerName}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Legend overlay */}
                <MapLegend activeFilters={activeFilters} toggleFilter={toggleFilter} />

                {/* Detail panel overlay */}
                {selectedItem && (
                    <DetailPanel
                        item={selectedItem}
                        type={selectedType}
                        onClose={() => { setSelectedItem(null); setSelectedType(null); }}
                    />
                )}
            </div>
        </div>
    );
};

export default MapComponent;
