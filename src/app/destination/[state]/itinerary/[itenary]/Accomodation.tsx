import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';

interface AccommodationItem {
  title: string;
  image: string | false;
}

interface AccommodationProps {
  accomodations: Record<string, AccommodationItem>;
}

// You can use a local image or public URL
const FALLBACK_IMAGE = '/placeholder-hotel.jpg'; // place in /public folder

const Accomodations = ({ accomodations }: AccommodationProps) => {
  if (!accomodations || Object.keys(accomodations).length === 0) return null;

  const validAccomodations = Object.entries(accomodations).filter(
    ([_, data]) => typeof data.title === 'string' && data.title.trim() !== ''
  );

  if (validAccomodations.length === 0) return null;

  return (
    <div className="my-10 md:mt-24 scroll-mt-28" id="accomodations">
      <h4 className="font-semibold mb-4 text-2xl">Accomodations</h4>

      <Carousel>
        <CarouselContent>
          {validAccomodations.map(([key, data], index) => (
            <CarouselItem className="md:basis-1/3" key={key}>
              <div className="overflow-hidden rounded-lg shadow">
                <Image
                  src={
                    typeof data.image === 'string' && data.image.trim() !== ''
                      ? data.image
                      : FALLBACK_IMAGE
                  }
                  alt={data.title || `Accommodation ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-52 object-cover"
                />
                <div className="p-3 bg-white text-center text-sm font-medium">{data.title}</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Accomodations;
