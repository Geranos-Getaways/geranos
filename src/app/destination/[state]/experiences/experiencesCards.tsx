'use client'
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import EventCards from '@/components/custom/EventCards';
import defaultImage from '../../../../../public/global/Punjab.webp';
import Link from 'next/link';

interface Prop{
  state:string
}

const ExperiencesCards = ({state}:Prop) => {


  const [itineraries, setItineraries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?destination_of_itenary=${state}`);
        const data = await res.json();

        if (data) {
          const filtered = data.filter((item:any)=> item?.acf?.offerings === "Experiences")
           //fetch featured image
                const demo = await Promise.all(
                  filtered.map(async(item:any)=>{
                    let featuredImage = defaultImage.src

                    try {
                      const res = await fetch(`https://dashboard.geranosgetaways.com/wp-json/wp/v2/media/${item.acf?.thumbnail}`)
                      
                      const imgData = await res.json()
                      console.log("Image Data: ", imgData)
                     
                      featuredImage = imgData?.source_url  || defaultImage.src;
                    } catch (error) {
                      console.error("Failed to load featured image for ", item.id)
                    }

                    return {
                      ...item, featuredImage,
                    }
                  })
                )
              console.log("Demo Content: ", demo)
          setItineraries(demo);
        }
      } catch (error) {
        console.error("Something went wrong while fetching Itineraries");
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  return (
    <div className="py-12 px-2 md:px-16">
      <h2 className="text-3xl font-bold mb-2">Experiences</h2>
      <p className="text-gray-500 mb-8">Lorem ipsum dolor sit amet consectetur</p>

      <Carousel>
        <CarouselContent>
          {itineraries.map((item, index) => (
            <CarouselItem  className=" md:basis-1/2 lg:basis-1/5" key={index}> 
              <Link href={`/destination/${state}/itenary/${item?.slug}`}> 
   

  <EventCards title={item?.title?.rendered} destination={item?.acf?.destination_of_itenary} days={item?.acf?.days} nights={item?.acf?.nights} price={item?.acf?.starting_price} featuredImage={item?.featuredImage}/>
    </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ExperiencesCards;
