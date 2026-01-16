'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-400 mb-2">FindYourKing</h1>
          <p className="text-cyan-300">Connect with amazing people</p>
        </div>

        {/* Login Form */}
        <div className="bg-purple-900/50 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back</h2>

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

          <div>
            <label className="text-white block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-purple-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            />
          </div>

          <button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 rounded-lg transition">
            Log In
          </button>

          <div className="text-center">
            <a href="/forgot-password" className="text-cyan-300 hover:text-cyan-200 text-sm">
              Forgot Password?
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-purple-900/50 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition">
              Google
            </button>
            <button className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition">
              Apple
            </button>
          </div>

          <div className="text-center text-white">
            Don't have an account?{' '}
            <a href="/signup" className="text-gold-400 hover:text-gold-300 font-semibold">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
