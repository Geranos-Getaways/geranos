import Image from 'next/image';
import React from 'react';

interface DayItem {
  title: string;
  image: string;
}

interface ComponentProps {
  daywise: {
    [dayLabel: string]: DayItem;
  };
}

const DayWise = ({ daywise }: ComponentProps) => {
  if (!daywise || Object.keys(daywise).length === 0) {
    return <></>;
  }

  return (
    <div className="mt-10 md:mt-14 scroll-mt-28" id="dayWise">
      <h4 className="font-semibold mb-4 text-2xl">Day Wise</h4>

      <div className="mb-8">
        {Object.entries(daywise)
          .filter(([_, item]) => item?.title && item?.image)
          .map(([dayLabel, item]) => (
            <div
              key={dayLabel}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6"
            >
              <div className="w-full sm:w-24 h-48 sm:h-24 overflow-hidden rounded">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-base font-medium">
                <span className="mr-1 font-semibold">{dayLabel}:</span> {item.title}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DayWise;
