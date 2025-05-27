import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';

interface HighlightsProps {
  highlights?: Record<string, string> | null;
}

const Highlights = ({ highlights }: HighlightsProps) => {
  // Ensure highlights is a valid object before continuing
  const validHighlights = highlights
    ? Object.entries(highlights).filter(([_, img]) => typeof img === 'string' && img.trim() !== '')
    : [];

  if (validHighlights.length === 0) return null;

  return (
    <div className="mt-10 md:mt-24 scroll-mt-28" id="dayWise">
      <h4 className="font-semibold mb-4 text-2xl">Highlights</h4>

      <Carousel>
        <CarouselContent>
          {validHighlights.map(([key, img], index) => (
            <CarouselItem className="md:basis-1/3" key={key}>
              <div className="overflow-hidden rounded-lg shadow">
                <Image
                  src={img}
                  alt={`Highlight ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-52 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Highlights;
