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
        rendered: 'Ravi Mehra',
      },
      acf: {
        designation: 'Travel Enthusiast',
        testimonial:
          'Geranos Getaways curated a truly unforgettable experience for me. Every detail was thoughtfully planned and the cultural immersion was exceptional. Highly recommended!',
        personimage: '/global/Punjab.webp',
      },
    },
    {
      id: 2,
      title: {
        rendered: 'Aarushi Verma',
      },
      acf: {
        designation: 'Lifestyle Blogger',
        testimonial:
          'What stood out was the balance between luxury and authenticity. From local food trails to serene farm stays, the trip was magical. Can’t wait to book again!',
        personimage: '/global/Punjab.webp',
      },
    },
    {
      id: 3,
      title: {
        rendered: 'Dr. Karan Gill',
      },
      acf: {
        designation: 'Professor of Anthropology',
        testimonial:
          'As someone who studies culture, I was deeply impressed by the thoughtful itineraries. Geranos is doing incredible work preserving and promoting heritage tourism.',
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
