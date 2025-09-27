// file: src/app/book/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, Timestamp, addDoc } from 'firebase/firestore';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, startOfDay, endOfDay } from 'date-fns';

export default function BookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (selectedDate) {
      const getAvailableTimes = async () => {
        const openingTime = 11;
        const closingTime = 20;
        const slotDuration = 30;
        
        const dayStart = startOfDay(selectedDate);
        const dayEnd = endOfDay(selectedDate);
        const appointmentsRef = collection(db, 'appointments');
        const q = query(appointmentsRef, 
          where('bookingDate', '>=', Timestamp.fromDate(dayStart)),
          where('bookingDate', '<=', Timestamp.fromDate(dayEnd))
        );

        const querySnapshot = await getDocs(q);
        const bookedTimes = querySnapshot.docs.map(doc => format(doc.data().bookingDate.toDate(), 'HH:mm'));

        const allSlots: string[] = [];
        for (let hour = openingTime; hour < closingTime; hour++) {
          for (let minute = 0; minute < 60; minute += slotDuration) {
            if (hour === 19 && minute > 30) continue;
            allSlots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
          }
        }
        
        const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));
        setAvailableTimes(availableSlots);
      };

      getAvailableTimes();
    }
  }, [selectedDate]);

  // Inside src/app/book/page.tsx

// Inside src/app/book/page.tsx

const handleBooking = async () => {
  if (!user || !selectedDate || !selectedTime) {
    alert("Please make sure you've selected a date and time.");
    return;
  }

  try {
    const [hour, minute] = selectedTime.split(':').map(Number);
    const bookingDate = new Date(selectedDate);
    bookingDate.setHours(hour, minute);

    const appointmentData = {
      userId: user.uid,
      userEmail: user.email,
      serviceName: "General Appointment",
      bookingDate: Timestamp.fromDate(bookingDate),
      notes: notes,
      createdAt: Timestamp.now(),
    };

    // 1. Save the appointment to the database (same as before)
    await addDoc(collection(db, 'appointments'), appointmentData);

    // 2. NEW: Call our API to send the notification email
    await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });

    alert("Booking successful!");
    router.push('/');
  } catch (error) {
    console.error("Error creating appointment or sending email: ", error);
    alert("There was an error making your booking. Please try again.");
  }
};

  const dayPickerClassNames = {
    caption: 'flex justify-center py-2 mb-4 relative items-center',
    caption_label: 'text-lg font-medium text-gray-900',
    nav: 'flex items-center',
    nav_button: 'h-6 w-6 bg-transparent hover:bg-gray-100 p-1 rounded-md transition-colors',
    nav_button_previous: 'absolute left-1.5',
    nav_button_next: 'absolute right-1.5',
    table: 'w-full border-collapse',
    head_row: 'flex font-medium text-gray-800',
    head_cell: 'p-2 text-gray-500 uppercase text-sm',
    row: 'flex w-full mt-2',
    cell: 'p-0',
    day: 'h-9 w-9 p-0 font-normal text-gray-800 hover:bg-gray-100 rounded-md transition-colors',
    day_selected: 'bg-emerald-500 text-white hover:bg-emerald-500 hover:text-white',
    day_today: 'bg-gray-200 text-gray-900',
    day_disabled: 'text-gray-400 opacity-50',
  };

  if (loading || !user) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Book an Appointment</h1>
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Select a Date & Time</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-center">
            <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border p-3" classNames={dayPickerClassNames} fromDate={new Date()} />
          </div>
          <div className="mt-4 md:mt-0">
            {selectedDate && (
              <>
                <h3 className="font-semibold text-lg text-center mb-4 text-gray-800">Available times for {format(selectedDate, 'PPP')}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.length > 0 ? (
                    availableTimes.map((time) => (
                      <button key={time} onClick={() => setSelectedTime(time)} className={`p-2 border rounded-md text-center transition-colors text-gray-800 ${selectedTime === time ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100'}`}>
                        {time}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-3 text-center">No available times for this date.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {selectedDate && selectedTime && (
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Notes (Optional)</h2>
            {/* 👇 THIS IS THE CORRECTED PART 👇 */}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., 'Interested in a haircut and color consultation.'"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 placeholder:text-gray-500"
              rows={3}
            ></textarea>

            <div className="mt-6 text-center">
              <button onClick={handleBooking} className="bg-emerald-500 text-white font-bold text-lg px-8 py-3 rounded-md hover:bg-emerald-600 transition-colors">
                Confirm Booking for {selectedTime}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}