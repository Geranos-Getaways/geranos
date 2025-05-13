





import TextAndImage from "@/components/custom/Content/TextAndImage/TextAndImage";
import DestinationsCards from "@/components/custom/Content/DestinationsCards/DestinationsCards";
import Testimonials from '@/components/custom/Testimonials/Testimonials'
import HeroSlickSlider from '@/components/custom/Global/HeroHomeSlider/HeroHomeSlider'

export default async function Home() {



  const req = await fetch(`https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?acf_format=standard&per_page=100`, { cache: 'no-store' }); 
  const itineraries = await req.json(); 





  
  return (
    <main className="flex min-h-screen flex-col">

    

    <HeroSlickSlider/>

      <div className="min-h-[40px] block xl:hidden"></div>

      <TextAndImage 
      imageLink="/global/collage-8.png"
      imagePostion="right"
      titleText="About Geranos Getaways"
      subHeading="Your Gateway to Authentic Cultural and Luxurious Journeys"
      content="<p>At Geranos Getaways, we believe in appreciating culture through tourism. Travelling is about visiting new places and experiencing new ways of life, traditions, and values. By immersing ourselves in local culture, we can better understand and appreciate the world around us. </p><p>Our motto, <u><b>&quot;rediscover yourself&quot;</b></u> speaks to the essence of travelling and the motivation to escape from our comfort zones and experience tourism responsibly. Our mission is to provide travellers with an authentic and immersive cultural experience that allows them to appreciate the diversity of our world and rediscover themselves in the process.</p>"
      ctaText="Learn More"
      ctaLink=""
      />

      <TextAndImage 
      imageLink="/global/collage-11.png"      
      imagePostion="left"
      titleText="What Do We Offer?"
      subHeading="Curated, Immersive Experiences Designed Just for You"  
      content="<p>At Geranos Getaways, we take pride in curating deeply immersive and tailored luxury tours in Punjab and Uttarakhand. Our offerings are designed to immerse you in authentic local experiences that seamlessly blend historical, religious and cultural excursions with eco-friendly and sustainable stays. Our itineraries foster authentic connections with rural communities, farm stays, immersive village experiences, local food discovery, and nature trail adventures. These peerless offerings promise an enriching and unforgettable exploration of the diverse heritage, natural wonders, and vibrant local culture in Punjab and Uttarakhand.</p>"
      ctaText="Learn More"
      ctaLink=""    
      />  
      
      <TextAndImage 
      imageLink="/global/collage-13.png"      
      imagePostion="right"
      titleText="Why Us?"
      subHeading="Responsible Travel, Personalized Service, and Unforgettable Memories"
      content="<p>We understand the value of responsible travel and are committed to providing personalized journeys that align with your ethical principles. Our experts will accompany you on an immersive exploration of Punjab, Uttarakhand, and other regions of India. We focus on luxurious yet eco-friendly and responsible local accommodations and travel, ensuring that your journey is enriching and sustainable.</p>"
      ctaText="Learn More"
      ctaLink=""
      />   


   





          <div className="mb-12 md:mb-0">
          <ItinerarySlider 
          mainTitle="Experiences"
          itineraries={itineraries} 
          destinationFilterSlug="home-page"
          offeringFilterSlug="Tour Packages"
          />
          </div>







        <div className="mt-2 md:mt-12 w-full">  
          <Testimonials/>
        </div>

    </main>
  );
}
