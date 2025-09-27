// file: src/app/admin/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
// NEW: Import the functions we need to delete a document
import { collection, getDocs, query, orderBy, doc, deleteDoc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { format } from 'date-fns';
import { ADMIN_EMAIL } from '@/lib/config';

interface Appointment {
  id: string;
  userEmail: string;
  serviceName: string;
  bookingDate: Date;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // This effect protects the route (same as before)
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.email !== ADMIN_EMAIL) {
        alert("Access Denied: You are not authorized to view this page.");
        router.push('/');
      }
    }
  }, [user, loading, router]);
  
  // This effect fetches the appointments (same as before)
  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      const fetchAppointments = async () => {
        const appointmentsRef = collection(db, 'appointments');
        const q = query(appointmentsRef, orderBy('bookingDate', 'asc'));
        const querySnapshot = await getDocs(q);
        const appointmentsList = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          userEmail: doc.data().userEmail,
          serviceName: doc.data().serviceName,
          bookingDate: doc.data().bookingDate.toDate(),
        }));
        setAppointments(appointmentsList);
      };
      fetchAppointments();
    }
  }, [user]);

  // NEW: Function to handle canceling an appointment
  const handleCancelAppointment = async (appointmentId: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment? This action cannot be undone.")) {
      try {
        // Delete the document from the 'appointments' collection in Firestore
        await deleteDoc(doc(db, 'appointments', appointmentId));
        
        // Update the list on the screen to instantly remove the canceled appointment
        setAppointments(prevAppointments => 
          prevAppointments.filter(appt => appt.id !== appointmentId)
        );
        
        alert("Appointment canceled successfully.");
      } catch (error) {
        console.error("Error canceling appointment: ", error);
        alert("Failed to cancel the appointment. Please try again.");
      }
    }
  };

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading and verifying access...</p></div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="mt-4 text-lg text-gray-600">Welcome, Admin! Here is the list of all appointments.</p>
      
      <div className="mt-8 bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Client Email</th>
              <th className="p-4 font-semibold text-gray-700">Service</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
              <th className="p-4 font-semibold text-gray-700">Time</th>
              <th className="p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <tr key={appt.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-gray-800">{appt.userEmail}</td>
                  <td className="p-4 text-gray-800">{appt.serviceName}</td>
                  <td className="p-4 text-gray-800">{format(appt.bookingDate, 'PPP')}</td>
                  <td className="p-4 text-gray-800">{format(appt.bookingDate, 'p')}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleCancelAppointment(appt.id)}
                      className="bg-emerald-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-emerald-600 transition-colors"
                    >
                      Mark as Complete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}