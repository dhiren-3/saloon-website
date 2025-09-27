// file: src/components/Navbar.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { ADMIN_EMAIL } from '@/lib/config';
import Link from 'next/link'; // Import the Link component

export default function Navbar() {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Grace Unisex Saloon
        </Link>
        <div className="space-x-6 text-lg flex items-center">
          <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
          <Link href="/gallery" className="text-gray-600 hover:text-gray-900">Gallery</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          
          {user ? (
            <>
              {user.email === ADMIN_EMAIL && (
                <Link href="/admin" className="text-emerald-600 font-bold hover:underline">
                  Admin Dashboard
                </Link>
              )}
              <span className="text-gray-700 text-sm">{user.email}</span>
              <button onClick={handleSignOut} className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 text-base">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-gray-700 text-base">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}