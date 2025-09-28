// file: src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { ADMIN_EMAIL } from '@/lib/config';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // Import icons

export default function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const handleSignOut = async () => {
    setIsMenuOpen(false); // Close menu on sign out
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Grace Unisex Salon
          </Link>

          {/* Hamburger Menu Button - Only shows on mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Menu - Only shows on medium screens and up */}
          <div className="hidden md:flex space-x-6 text-lg items-center">
            <Link href="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900">Gallery</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            {user && user.email === ADMIN_EMAIL && (
              <Link href="/admin" className="text-emerald-600 font-bold hover:underline">Admin</Link>
            )}
            {user ? (
              <>
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
        </div>

        {/* Mobile Menu - Shows when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4 text-center">
              <Link href="/services" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-gray-900 py-2">Services</Link>
              <Link href="/gallery" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-gray-900 py-2">Gallery</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-gray-900 py-2">Contact</Link>
              {user && user.email === ADMIN_EMAIL && (
                <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="text-emerald-600 font-bold hover:underline py-2">Admin Dashboard</Link>
              )}
              {user ? (
                <button onClick={handleSignOut} className="bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                  Sign Out
                </button>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700">
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}