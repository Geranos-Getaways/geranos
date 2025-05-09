export async function getItinerariesByDestination(destinationId: number) {
    try {
      const res = await fetch(`https://dashboard.geranosgetaways.com/wp-json/wp/v2/itineraries?acf_format=standard&_fields=id,title,acf,slug`, {
        cache: 'no-store' // SSR dynamic behavior
      });
      
      const data = await res.json();
  
      // Filter by destinationId
      return data.filter((item: any) => item.acf?.destination === destinationId);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      return [];
    }
  }
  