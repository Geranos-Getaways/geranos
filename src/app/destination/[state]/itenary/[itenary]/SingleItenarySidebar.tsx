import React from 'react';

interface ComponentProp {
  destination: string;
  price: any;
}

const SingleItenarySidebar = ({ destination, price }: ComponentProp) => {
  return (
    <div className="w-full lg:w-1/3 sticky top-28  bottom-20 self-start h-fit bg-white shadow-lg rounded-xl p-6">
      <h3 className="text-md font-semibold mb-2">Customise your trip</h3>
      <p className="text-sm text-gray-600 mb-6">
        with someone who has been to {destination || 'Not Mentioned'}
      </p>

      <form className="space-y-3">
        <input
          type="text"
          placeholder="Full name"
          className="w-full border rounded px-4 py-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="WhatsApp Phone no."
          className="w-full border rounded px-4 py-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="No. of travellers"
          className="w-full border rounded px-4 py-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Dates of travel"
          className="w-full border rounded px-4 py-2 focus:outline-none"
        />
        <div className="text-sm text-gray-500">
          Starting from{' '}
          <span className="font-semibold text-black">₹{price || 'Not Mentioned'}</span> per person
        </div>
        <button
          type="submit"
          className="w-full mt-2 bg-[#0099cc] text-white py-2 rounded hover:bg-[#007fab] transition"
        >
          PLAN WITH AN EXPERT
        </button>
      </form>
    </div>
  );
};

export default SingleItenarySidebar;
