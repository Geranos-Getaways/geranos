import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import SingleCard from "./SingleCard"

export const revalidate = 10

export default async function CarouselSize(props:any) {

  const req = await fetch(`https://geranosgetaways.com/wp-json/wp/v2/${props.acfPostTypeSlug}?acf_format=standard&_fields=id,acf,thumbnail_title_1,thumbnail_title_2,slider_title_medium,slider_title_large,slider_title_small`, { cache: 'no-store' } ); 
  const pages = await req.json(); 

  return (
    <>
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="pt-8">
 
      {
      pages && pages.map((destination:any) => {
        return (
    
          <SingleCard 
          indexId={destination.id}
          thumbnailImage={destination.acf.thumbnail.url}
          cardImageTitle={destination.acf.thumbnail_title_1}
          cardImageSubTitle={destination.acf.thumbnail_title_2}
          cardTitleMedium={destination.acf.slider_title_medium}
          cardTitleLarge={destination.acf.slider_title_large}
          cardTitleSmall={destination.acf.slider_title_small}
          />
   
          )
      })
      }
                    



      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </>
  )
}
