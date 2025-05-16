'use client'
import ItinaryCards from "./itinaryCards";

interface PageProp{
  params:{
    state:string
  }
}
const Page = ({params}:PageProp) => {
  
 
  return (
    
    
   
    <ItinaryCards state={params.state}/>
   
 
  );
};

export default Page;
