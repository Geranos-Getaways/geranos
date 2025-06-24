'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { MessageCircleMore } from 'lucide-react'; // Optional alternative
import Link from 'next/link';

const WhatsAppButton = () => {
  const phoneNumber = '919999999999'; // Replace with your number

  return (
    <Link
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition duration-300"
    >
      <FaWhatsapp className="text-white w-7 h-7" />
      {/* Or: <MessageCircleMore className="text-white w-7 h-7" /> */}
    </Link>
  );
};

export default WhatsAppButton;
