'use client'

import React from 'react'
import { useEffect } from 'react';
import Image from 'next/image'

const BlogRenderModule = (props: any) => {

 



  return (       

    <>
        { (props.pageData.acf.desktop_featured_image) && 
            <Image 
            src={props.pageData.acf.desktop_featured_image} 
            width="1920" 
            height="1080" 
            alt="featured image"
            className="max-h-[400px] object-cover"
            />
        }
        <div className="max-w-[800px] m-auto px-4">

        <div className="text-[#2F6BEB] text-3xl md:text-4xl text-left font-bold py-[80px]">{props.pageData.title.rendered}</div>
        
        <div className="postContParaFixCstm text-left" dangerouslySetInnerHTML={{__html: props.pageData.content.rendered}}/>

 
    </div>

    </>
  )
}

export default BlogRenderModule