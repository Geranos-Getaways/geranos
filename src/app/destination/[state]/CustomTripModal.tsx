'use client';
import { useState } from "react";
import Image from "next/image";

const CustomTripModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    people: "",
    city: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form);
    // Add form submission logic here (e.g., API or email trigger)
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#0099cc] text-white px-6 py-3 rounded-full font-medium hover:bg-[#007fab] transition"
      >
        CUSTOMISE TRIP
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl w-full max-w-4xl flex flex-col md:flex-row">
            {/* Left Image */}
            <div className="relative w-full md:w-1/2 h-72 md:h-auto">
              <Image
                src="/global/Punjab.webp" // your image path
                alt="Custom Trip"
                layout="fill"
                objectFit="cover"
                className="rounded-l-2xl"
              />
            </div>

            {/* Right Form */}
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
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <input
                  type="number"
                  name="people"
                  placeholder="No. of People"
                  value={form.people}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Your City"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
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
    </>
  );
};

export default CustomTripModal;
