import React from 'react'

const Pages = async({ params } : {params:any}) => {

    const req = await fetch(`https://grhealthy.in/wp-json/wp/v2/pages?_fields=id,slug,title,content&slug=${params.slug}`); 
    const pages = await req.json(); 
    const page = pages[0];

  return (
    <div className="max-w-[800px] m-auto">
        <div className="text-4xl text-center font-semibold py-[80px]">{page.title.rendered}</div>
        <div dangerouslySetInnerHTML={{__html: page.content.rendered}}/>    
    </div>    
  )
}

export default Pages