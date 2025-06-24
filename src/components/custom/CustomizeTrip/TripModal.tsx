'use client';
import { useState } from 'react';
import Image from 'next/image';

const TripModal = () => {
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
        setShowThankYou(true); // 🎉 Show thank-you popup
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#0099cc] text-white px-6 py-3 rounded-full font-medium hover:bg-[#007fab] transition"
      >
        CUSTOMISE TRIP
      </button>

      {/* Main Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-5">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl w-full max-w-4xl flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/2 h-56 md:h-auto">
              <Image
                src="/global/Punjab.webp"
                alt="Custom Trip"
                layout="fill"
                objectFit="cover"
                className="md:rounded-l-2xl"
              />
            </div>
            <div className="w-full md:w-1/2 p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Customize Your Trip</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-black text-2xl"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input fields */}
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3"
                />
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3"
                />
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3"
                />
                <input
                  type="text"
                  name="tocity"
                  placeholder="Destination City"
                  value={form.tocity}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-3"
                />
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
                <textarea
                  name="message"
                  placeholder="Enter package name, destination, places..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3"
                />
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#0099cc] text-white font-semibold py-3 rounded-full hover:bg-[#007fab] transition"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
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
      )}
    </>
  );
};

export default TripModal;
