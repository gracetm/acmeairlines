export type TravelScope = 'Domestic' | 'International';

export const destinations = {
  Domestic: [
    { name: 'Gopalpur', image: 'gopalpur.jpg', description: 'Beautiful architecture beside peaceful waters.' },
    { name: 'Dhaka', image: 'dhaka.jpg', description: 'Discover the energy and culture of the capital.' },
    { name: 'Chattagram', image: 'chattagram.jpg', description: 'A vibrant city where the hills meet the sea.' },
    { name: 'Cox’s Bazar', image: 'beach.jpg', description: 'Slow down on a beautiful stretch of coastline.' },
  ],
  International: [
    { name: 'Istanbul', image: 'gopalpur.jpg', description: 'Historic wonders on the shores of the Bosphorus.' },
    { name: 'Toronto', image: 'dhaka.jpg', description: 'A world of cultures and an unforgettable skyline.' },
    { name: 'New York', image: 'chattagram.jpg', description: 'Find your next story in the city that never sleeps.' },
    { name: 'Maldives', image: 'beach.jpg', description: 'Your own little piece of island paradise.' },
  ],
} satisfies Record<TravelScope, { name: string; image: string; description: string }[]>;

export const routes = {
  Domestic: ['Cox’s Bazar', 'Chattagram', 'Silhet', 'Rajshahi', 'Khagrasori', 'Tangail'],
  International: ['Singapore', 'Bangkok', 'Kuala Lumpur', 'Dubai', 'London', 'Istanbul'],
} satisfies Record<TravelScope, string[]>;

export const faqs = [
  { question: 'What is CloudPilot Flight?', answer: 'CloudPilot brings destination inspiration and flight planning together in one simple place. This interactive preview lets you explore routes and plan your next adventure.' },
  { question: 'Can I book international flights through your agency?', answer: 'You can explore international destinations by selecting the International tab. This is a frontend demo, so reservations and payments are not processed.' },
  { question: 'How do I change or cancel my flight booking?', answer: 'For an existing reservation, contact the airline or agency you booked with and have your booking reference ready. Changes and cancellation fees depend on the fare rules.' },
  { question: 'Do you offer travel insurance?', answer: 'Travel insurance options depend on your destination and booking provider. Check coverage for medical expenses, cancellations, and baggage before purchasing a policy.' },
  { question: 'Can I reserve a seat or choose a meal when booking?', answer: 'Most airlines offer seat selection and meal preferences during booking or through their Manage Booking page. Availability and additional charges vary by airline.' },
  { question: 'How will I receive my tickets after booking?', answer: 'When you book with an airline or booking provider, your confirmation and e-ticket are normally sent to your email. No tickets are issued by this demo.' },
  { question: 'Do you offer group or corporate travel deals?', answer: 'Use Become a partner to try our business inquiry form. In this demo, you can preview the process without sending any personal information to a server.' },
];

export const testimonials = [
  { name: 'Sarah M.', location: 'New York, USA', avatar: 'sarah.jpg', quote: 'I booked my honeymoon trip through this agency and the experience was flawless! From flight arrangements', country: 'United States' },
  { name: 'Maria L.', location: 'London, UK', avatar: 'maria.jpg', quote: 'Finding affordable flights used to be stressful until I found this agency. Their search tool is fast and easy', country: 'London' },
  { name: 'Eleanor nimbus', location: 'From Unite States', avatar: 'eleanor.jpg', quote: 'Their customer support is top-notch! I had to reschedule my flight last minute and they managed it quickly', country: 'South Korea' },
];
