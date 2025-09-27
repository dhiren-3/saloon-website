// file: functions/src/index.ts

// NEW: Import from the v2 functions library
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";
import * as sgMail from "@sendgrid/mail";

// This part for getting the config stays the same for now
import * as functions from "firebase-functions";
const apiKey = functions.config().sendgrid.key;
sgMail.setApiKey(apiKey);

const FROM_EMAIL = "your-verified-sendgrid-email@example.com";
const TO_EMAIL = "owner-email@example.com";

// NEW: This is the updated v2 syntax for a Firestore trigger
export const sendBookingNotification = onDocumentCreated("appointments/{appointmentId}", async (event) => {
    const snap = event.data;
    if (!snap) {
      logger.log("No data associated with the event");
      return;
    }

    const appointment = snap.data();

    const bookingDate = appointment.bookingDate.toDate();
    const formattedDate = bookingDate.toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
    const formattedTime = bookingDate.toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit",
    });

    const msg = {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: "🎉 New Appointment Booking!",
      html: `
        <h1>You have a new booking!</h1>
        <p><strong>Client:</strong> ${appointment.userEmail}</p>
        <p><strong>Service:</strong> ${appointment.serviceName}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${formattedTime}</p>
        <p><strong>Notes:</strong> ${appointment.notes || "None"}</p>
      `,
    };
    
    try {
      await sgMail.send(msg);
      logger.log("New booking email sent via SendGrid to:", TO_EMAIL);
    } catch (error) {
      logger.error("Error sending email via SendGrid:", error);
    }
  });