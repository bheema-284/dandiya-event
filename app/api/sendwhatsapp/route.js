// Force Node.js runtime (Twilio requires it)
export const runtime = 'nodejs';

import twilio from 'twilio';
import { NextResponse } from 'next/server';

const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.NEXT_PUBLIC_TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);
const eventSchedule = [
    { day: 1, event: 'Opening Ceremony & Live Band' },
    { day: 2, event: 'Garba Workshop & DJ Night' },
    { day: 3, event: 'Traditional Folk Dance Night' },
    { day: 4, event: 'Bollywood Dance Extravaganza' },
    { day: 5, event: 'Fusion Night & Celebrity Guest' },
    { day: 6, event: 'Kids Dandiya & Family Fun' },
    { day: 7, event: 'Energetic Dandiya Battle' },
    { day: 8, event: 'Live Stand-up & Bhangra' },
    { day: 9, event: 'Grand Finale with Firework Show' },
];
export async function POST(req) {
    try {
        const { to, ticketCode, selectedDays, foodItems, totalPrice } = await req.json();

        if (!to || !ticketCode || !selectedDays || !totalPrice) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        // Format days with event names
        const dayEventLines = selectedDays.map(day => {
            const event = eventSchedule.find(e => e.day === day);
            return `Day ${day} - ${event ? event.event : 'Event not found'}`;
        }).join('\n');

        // Format food items
        const foodLines = (Array.isArray(foodItems) && foodItems.length > 0)
            ? foodItems.map(f => `• ${f.name} (₹${f.price.toFixed(2)})`).join('\n')
            : 'None';

        const messageBody =
            `🎉 *Dandiya Night Ticket Confirmation* 🎉\n\n` +
            `🎫 Ticket Code: *${ticketCode}*\n\n` +
            `📅 Days & Events:\n${dayEventLines}\n\n` +
            `🍽️ Food Items:\n${foodLines}\n\n` +
            `💰 Total Paid: ₹${Number(totalPrice).toFixed(2)}\n\n` +
            `✅ Show this message at the entry gate.\n` +
            `Enjoy the event! 💃🕺`;


        const message = await client.messages.create({
            from: `whatsapp:${twilioNumber}`,
            to: `whatsapp:${to}`,
            body: messageBody,
        });

        console.log(`WhatsApp message sent successfully. SID: ${message.sid}`);
        return NextResponse.json({ success: true, messageId: message.sid }, { status: 200 });

    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return NextResponse.json({ success: false, error: error.message || 'Failed to send message' }, { status: 500 });
    }
}
