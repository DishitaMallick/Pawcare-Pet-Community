import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";
import FormInput from '../components/FormInput';
import { motion } from 'framer-motion';

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '', phone: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignup) {

                await createUserWithEmailAndPassword(
                    auth,
                    formData.username,
                    formData.password
                );

                alert("🎉 Account created successfully!");
                setIsSignup(false);

            } else {

                await signInWithEmailAndPassword(
                    auth,
                    formData.username,
                    formData.password
                );

                localStorage.setItem("token", "loggedin");
                localStorage.setItem("username", formData.username);

                window.location.href = "/";

            }

        } catch (error) {

            alert(error.message);

        }
    };

    return (
        <div style={{ maxWidth: '440px', margin: '3rem auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
            >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem', display: 'inline-block', animation: 'pawBounce 3s ease-in-out infinite' }}>🐾</div>
                <h1 style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: '2.2rem',
                    background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.3rem'
                }}>
                    {isSignup ? 'Join PawCare 🐶' : 'Welcome Back! 🐾'}
                </h1>
                <p style={{ color: 'rgba(0,0,0,0.55)', fontSize: '0.95rem' }}>
                    {isSignup ? 'Create your account and start caring for your pets.' : 'Sign in to access your PawCare dashboard.'}
                </p>
            </motion.div>

            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,107,107,0.2)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    backdropFilter: 'blur(16px)'
                }}
            >
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <FormInput
                        label="Email"
                        placeholder="Enter your email"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                    {isSignup && (
                        <FormInput
                            label="Phone Number"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    )}
                    <FormInput
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <button
                        type="submit"
                        style={{
                            background: 'linear-gradient(135deg, #FF6B6B, #FF8B94)',
                            border: 'none',
                            padding: '1rem',
                            borderRadius: '14px',
                            color: '#000000',
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            marginTop: '0.5rem',
                            fontFamily: "'Nunito', sans-serif",
                            boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {isSignup ? '🐾 Create Account' : '🐾 Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.5)' }}>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}
                    {' '}
                    <span
                        style={{ color: '#4ECDC4', cursor: 'pointer', fontWeight: 700 }}
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup ? 'Log in' : 'Sign up free'}
                    </span>
                </p>
            </motion.div>

            {/* Trust badges */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                {['🔒 Secure', '🐾 12K+ Members', '⭐ 4.9 Rating'].map((badge, i) => (
                    <span key={i} style={{
                        fontSize: '0.78rem', fontWeight: 700,
                        color: 'rgba(0,0,0,0.4)',
                        display: 'flex', alignItems: 'center', gap: '0.3rem'
                    }}>
                        {badge}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Login;
