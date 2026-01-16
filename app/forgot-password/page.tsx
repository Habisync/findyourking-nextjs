'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-purple-900/50 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Reset Password</h2>
          {!sent ? (
            <>
              <p className="text-gray-300 text-center mb-4">Enter your email and we'll send you a reset link</p>
              <div>
                <label className="text-white block mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-purple-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="your@email.com"
                />
              </div>
              <button onClick={() => setSent(true)} className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 rounded-lg transition">
                Send Reset Link
              </button>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">✉️</div>
              <p className="text-white text-lg mb-2">Check your email!</p>
              <p className="text-gray-300 text-sm">We've sent a password reset link to {email}</p>
            </div>
          )}
          <div className="text-center">
            <a href="/login" className="text-cyan-300 hover:text-cyan-200 text-sm">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
