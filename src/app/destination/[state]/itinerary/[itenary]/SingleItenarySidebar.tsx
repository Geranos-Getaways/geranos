'use client';
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface ComponentProp {
  destination: string;
  price: any;
}

const SingleItenarySidebar = ({ destination, price }: ComponentProp) => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  return (
    <div className="w-full lg:w-1/3 md:sticky top-28 bottom-20 self-start h-fit bg-white shadow-lg rounded-xl p-6">
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
          placeholder="Mobile No."
          className="w-full border rounded px-4 py-2 focus:outline-none"
        />
        <input
          type="text"
          placeholder="No. of travellers"
          className="w-full border rounded px-4 py-2 focus:outline-none"
        />

        {/* Dates of travel */}
        <div className="relative">
          <input
            type="text"
            readOnly
            onClick={() => setOpen(!open)}
            value={`${format(dateRange[0].startDate, 'dd MMM yyyy')} - ${format(
              dateRange[0].endDate,
              'dd MMM yyyy'
            )}`}
            className="w-full border rounded px-4 py-2 focus:outline-none cursor-pointer"
          />
          {open && (
            <div className="absolute z-50 bg-white shadow-lg mt-2 rounded">
              <DateRange
                ranges={dateRange}
                onChange={(item: any) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                rangeColors={['#0099cc']}
                editableDateInputs={true}
              />
            </div>
          )}
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
