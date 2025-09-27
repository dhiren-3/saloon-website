// file: src/app/api/send-notification/route.ts

import { NextResponse } from 'next/server';
import * as sgMail from '@sendgrid/mail';

export async function POST(request: Request) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const toEmail = process.env.TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Missing environment variables for SendGrid");
    return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
  }

  sgMail.setApiKey(apiKey);

  try {
    const appointment = await request.json();
    const bookingDate = new Date(appointment.bookingDate.seconds * 1000);

    const formattedDate = bookingDate.toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const formattedTime = bookingDate.toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit",
    });

    const msg = {
      to: toEmail,
      from: fromEmail,
      subject: "🎉 New Appointment Booking!",
      html: `
        <h1>You have a new booking!</h1>
        <p><strong>Client:</strong> ${appointment.userEmail}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Notes:</strong> ${appointment.notes || "None"}</p>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}

// This empty export helps ensure the file is treated as a module.
export {};