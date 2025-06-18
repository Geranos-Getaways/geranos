import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TestimonialCard from './TestimonialCard';

interface Testimonial {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    designation: string;
    testimonial: string;
    personimage: string;
  };
}

export default async function CarouselDemo() {
  const sampleTestimonials = [
    {
      id: 1,
      title: {
        rendered: 'Sebestian Kuruvilla',
      },
      acf: {
        designation: 'Travel Enthusiast',
        testimonial:
          'I recently had the pleasure of exploring Punjab, and it was truly a transformative experience. Every detail was meticulously planned, and the personalized itinerary made me feel like I was getting an insider’s view of the region. The farm stay was a highlight—immersing myself in village life was humbling and enriching. I can’t recommend Geranos Getaways enough for anyone looking to experience India in a responsible, authentic, and unforgettable way.',
        personimage: '/global/Punjab.webp',
      },
    },
    {
      id: 2,
      title: {
        rendered: 'Matthew Roelandts',
      },
      acf: {
        designation: 'Lifestyle Blogger',
        testimonial:
          'Our experience for the Baisakhi festival at Falcon Green Farm was extraordinary. The team ensured that our family had a truly immersive experience, celebrating Baisakhi in the heart of Punjab. The festival celebrations were vibrant and unforgettable, with traditional music, dance, and a feast that captured the season’s spirit. My family and I felt so welcomed and cared for the personal touch.',
        personimage: '/global/Punjab.webp',
      },
    },
    {
      id: 3,
      title: {
        rendered: 'Priyakshi Saikia',
      },
      acf: {
        designation: 'Professor of Anthropology',
        testimonial:
          'We recently booked an offshore honeymoon package with Geranos Getaways, including flights, and we couldn’t be happier with the service. They handled everything from airline bookings to customized itineraries, making the entire process seamless and stress-free. The attention to detail was incredible—everything was planned around our preferences, and we even had the option to choose eco-friendly travel options. Whether you’re looking for a quick getaway or a more extensive exploration of India and beyond, Geranos Getaways ensures that every aspect of your journey is taken care of with the utmost care and professionalism. Highly recommend!',
        personimage: '/global/Punjab.webp',
      },
    },
    {
      id: 4,
      title: {
        rendered: 'Sashank',
      },
      acf: {
        designation: 'Professor of Anthropology',
        testimonial:
          'My trip to the Andaman and Nicobar Islands for scuba diving certification was flawlessly organized by Geranos Getaways. They cared for everything, from air tickets to accommodations, and even suggested excellent sightseeing options. The accommodations were comfortable and conveniently located near the dive sites. Thanks to their expertise, we enjoyed a seamless and unforgettable experience.',
        personimage: '/global/Punjab.webp',
      },
    },
  ];

  const res = await fetch(
    'https://dashboard.geranosgetaways.com/wp-json/wp/v2/testimonials?acf_format=standard',
    { cache: 'no-store' }
  );

  let testimonials: Testimonial[] = [];

  try {
    const text = await res.text();
    testimonials = text ? JSON.parse(text) : [];
  } catch (err: any) {
    console.error('❌ Error parsing testimonials JSON:', err.message);
  }

  return (
    <div className="cstmClsTestiminial">
      <h2 className="text-3xl md:text-5xl font-bold text-[#246BEB] font-EduVICWANTBeginner text-center mb-8">
        Traveller&apos;s Reviews
      </h2>

      <div className="max-w-[1800px] px-[16px] md:px-[64px] flex m-auto w-full">
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselContent>
            {sampleTestimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 xl:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="rounded-3xl h-full bg-[#246BEB]">
                    <CardContent className="flex items-center justify-center p-6">
                      <TestimonialCard
                        testimnlName={testimonial.title.rendered}
                        testimnlDesignation={testimonial.acf.designation}
                        testimnlTestimonial={testimonial.acf.testimonial}
                        testimnlPersonImage={testimonial.acf.personimage}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
