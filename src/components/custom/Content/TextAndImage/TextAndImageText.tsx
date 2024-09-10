import React from 'react'
import AlgoliaBlueButton from "@/components/animata/text/button/algolia-blue-button";
import { Button } from '@/components/ui/button'
import Heading from './Heading'

const TextAndImageText = (props:any) => {
  return (
    <div className="order-[-1] xl:-order-none text-center md:text-left w-full flex flex-col align-middle justify-center gap-8 px-0 xl:px-20 xl:py-[20px]">
    <h2 className="text-3xl md:text-5xl font-bold text-[#246BEB] font-EduVICWANTBeginner">{props.titleText}</h2>
    <h3 className="text-xl md:text-2xl text-slate-700 font-bold font-UrbanistLight">{props.subHeading}</h3>

    <div
      className="text-justify text-md sm:text-xl font-UrbanistLight tracking-wide"
      dangerouslySetInnerHTML={{__html: props.content}}test
    />


    { props.ctaLink &&
      <div className="text-center">
      <AlgoliaBlueButton ctaText={props.ctaText} ctaLink={props.ctaLink}/>
      </div>
    }

</div>
  )
}

export default TextAndImageText