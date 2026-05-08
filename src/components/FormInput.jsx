import React from 'react';

const FormInput = ({ label, type = 'text', placeholder, value, onChange, required = false }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', marginBottom: '1rem' }}>
            <label style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--glass-text)',
                letterSpacing: '0.2px'
            }}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                style={{
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    padding: '0.8rem 1rem',
                    borderRadius: '12px',
                    color: 'var(--input-color)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    fontFamily: "'Nunito', sans-serif",
                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                    width: '100%'
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255,107,107,0.12)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--input-border)';
                    e.target.style.boxShadow = 'none';
                }}
            />
        </div>
    );
};

export default FormInput;
