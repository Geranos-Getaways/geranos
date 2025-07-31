'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface TripModalProps {
  heroImage?: string;
}

const TripModal = ({ heroImage = '/global/Punjab.webp' }: TripModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    tocity: '',
    adult: '0',
    child: '0',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/submit-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({
          name: '',
          email: '',
          phone: '',
          startDate: '',
          endDate: '',
          tocity: '',
          adult: '0',
          child: '0',
          message: '',
        });
        setIsOpen(false);
        setShowThankYou(true);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Main form modal content
  const ModalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center px-2 py-6">
      <div className="relative z-[10000] bg-white rounded-2xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden my-12 max-h-[90vh] overflow-y-auto">
        {/* Left Image */}
        <div className="relative w-full md:w-1/2 h-40 md:h-auto">
          <Image
            src={heroImage}
            alt="Custom Trip"
            layout="fill"
            objectFit="cover"
            className="md:rounded-l-2xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl z-10"
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-xl font-semibold">Customize Your Trip</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1">Destination City</label>
              <input
                type="text"
                name="tocity"
                placeholder="Destination City"
                value={form.tocity}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1">Number of Adults</label>
              <input
                type="number"
                name="adult"
                placeholder="Number of Adults"
                value={form.adult}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <div className="flex flex-col col-span-1">
              <label className="text-sm font-medium text-gray-700 mb-1">Number of Children</label>
              <input
                type="number"
                name="child"
                placeholder="Number of Children"
                value={form.child}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <div className="flex flex-col col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1">Additional Details</label>
              <textarea
                name="message"
                placeholder="Enter package name, destination, places..."
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-3"
              />
            </div>
            <button
              type="submit"
              className="col-span-1 md:col-span-2 w-full mt-4 bg-[#0099cc] text-white font-semibold py-3 rounded-full hover:bg-[#007fab] transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Thank you modal
  const ThankYouModal = (
    <div className="fixed inset-0 z-[10001] bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={() => setShowThankYou(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
        >
          ×
        </button>
        <h3 className="text-xl font-semibold mb-2 text-center">Thank you!</h3>
        <p className="text-sm text-gray-600 text-center">
          Your request has been submitted successfully. Our travel experts will reach out to you
          shortly.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#0099cc] text-white px-6 py-3 rounded-full font-medium hover:bg-[#007fab] transition"
      >
        CUSTOMISE TRIP
      </button>

      {isOpen && typeof window !== 'undefined' ? createPortal(ModalContent, document.body) : null}

      {showThankYou && typeof window !== 'undefined'
        ? createPortal(ThankYouModal, document.body)
        : null}
    </>
  );
};

export default TripModal;
