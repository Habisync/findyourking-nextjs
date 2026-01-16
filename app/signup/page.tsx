'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold-400 mb-2">FindYourKing</h1>
          <p className="text-cyan-300">Join the community</p>
        </div>
        <div className="bg-purple-900/50 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Create Account</h2>
          <div>
            <label className="text-white block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-purple-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Choose a username"
            />
          </div>
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
              placeholder="Create a strong password"
            />
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" className="rounded mt-1" />
            <label className="text-sm text-gray-300">
              I agree to the{' '}
              <a href="/terms" className="text-cyan-300 hover:text-cyan-200">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-cyan-300 hover:text-cyan-200">Privacy Policy</a>
            </label>
          </div>
          <button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold py-3 rounded-lg transition">
            Sign Up
          </button>
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
            Already have an account?{' '}
            <a href="/login" className="text-gold-400 hover:text-gold-300 font-semibold">
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
