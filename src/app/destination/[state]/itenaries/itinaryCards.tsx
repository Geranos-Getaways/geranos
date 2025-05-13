'use client'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

const ItinaryCards = () => {

    const[itineraries, setItineraries] = useState()
    const[loading,setLoading]= useState([])


    useEffect(()=>{
        const fetchItenaries = async()=>{
           try {
             const res = await fetch(`https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?destination_of_itenary=punjab`)
             const data= await res.json()

             if(data){
                console.log("Itineraries Data: ", data)
                setItineraries(data)
             }
           } catch (error) {
            console.error("Something went wrong while fetching Itineraries")
           }finally{

           }
        }

        fetchItenaries()
    },[])

  return (
   <>
    {/* Tour Packages */}
    <div className="py-12 px-2 md:px-16">
      <h2 className="text-3xl font-bold mb-2">Itenaries</h2>
      <p className="text-gray-500 mb-8">Current favourites for travellers like you</p>

      <Carousel>
  <CarouselContent>
  {itineraries && itineraries.map((item, index) => (
    <CarouselItem className=" md:basis-1/4" key={item?.title?.rendered}> <div
    
    className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
  >
    <div className="relative w-full h-52">
      <Image
        src={item?.image || '/global/Punjab.webp'}
        alt={item?.title}
        layout="fill"
        objectFit="cover"
        className="rounded-t-2xl"
      />
      <div className="absolute bottom-4 left-4 text-white z-10">
        <h3 className="text-lg font-semibold drop-shadow">{item?.title?.rendered}</h3>
        <p className="text-xs uppercase tracking-wide">{item?.acf?.destination_of_itenary}</p>
      </div>
      <div className="absolute inset-0 bg-black/20 rounded-t-2xl" />
    </div>

    <div className="p-4">
      <p className="text-sm text-gray-500">{item?.acf?.days} Days | {item?.acf?.nights} Nights </p>
      <p className="text-xs uppercase text-gray-400 mt-3">Starting From</p>
      <p className="text-lg font-semibold text-gray-800">{item?.acf?.starting_price} <span className="text-sm font-light">per person</span></p>
    </div>
  </div></CarouselItem>))}
   
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
    </div>

   </>
  )
}

export default ItinaryCards