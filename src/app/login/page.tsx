// file: src/app/login/page.tsx
'use client'; 

import { useState } from 'react';
import { auth } from '@/lib/firebase';
// NEW: Import the password reset function
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      // Sign Up logic
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Success! Your account has been created. Please sign in.");
        setIsSignUp(false);
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      // Sign In logic
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Sign in successful! Redirecting to homepage...");
        window.location.href = '/';
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  // NEW: Function to handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email address above to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Please check your inbox.");
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {isSignUp ? 'Create Your Account' : 'Sign In'}
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>

          {/* NEW: Forgot Password link appears only on the Sign In form */}
          {!isSignUp && (
            <div className="text-right text-sm">
              <button type="button" onClick={handlePasswordReset} className="font-medium text-emerald-600 hover:underline">
                Forgot Password?
              </button>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-gray-600">
          <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-emerald-600 hover:underline">
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}