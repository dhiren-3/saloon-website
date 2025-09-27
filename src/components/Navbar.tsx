// file: src/components/Navbar.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { ADMIN_EMAIL } from '@/lib/config'; // <-- Import the admin email

export default function Navbar() {
  const { user } = useAuth(); // Get the current user from our context

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
        <a href="/" className="text-2xl font-bold text-gray-800">
          Grace Unisex Saloon
        </a>
        <div className="space-x-6 text-lg flex items-center">
          <a href="/services" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="/gallery" className="text-gray-600 hover:text-gray-900">Gallery</a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>

          {user ? (
            // If user is logged in
            <>
              {/* 👇 THIS IS THE NEW PART 👇 */}
              {/* Check if the user is the admin */}
              {user.email === ADMIN_EMAIL && (
                <a href="/admin" className="text-emerald-600 font-bold hover:underline">
                  Admin Dashboard
                </a>
              )}

              <span className="text-gray-700 text-sm">{user.email}</span>
              <button onClick={handleSignOut} className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 text-base">
                Sign Out
              </button>
            </>
          ) : (
            // If user is not logged in
            <a href="/login" className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-gray-700 text-base">
              Login
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}