import React from 'react'
import Heading from './Heading'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import AlgoliaBlueButton from "@/components/animata/text/button/algolia-blue-button";
import DestinationSlider from './DestinationSlider'

const DestinationsCards = () => {
  return (
    <div className="max-w-[1400px] flex m-auto w-full">
        <div className="flex gap-4 flex-col justify-between w-full xl:flex-row p-4">
            <div className="w-full flex flex-col align-middle justify-center gap-8">
                <Heading className="text-[#246BEB]" content="Destinations"/>

                  <DestinationSlider/>
                

                <div>
                <AlgoliaBlueButton/>
                </div>


            </div>

        </div>
    </div>
  )
}

export default DestinationsCards