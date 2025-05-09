'use client'


import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HeroSection from '../HeroSection'
import Itenary from './Itenary'
import Experiences from './Experiences'
import CustomizeTrip from '../CustomizeTrip'


function Page() {
  return (
    <div className='page-wrapper min-h-[100vh]'>
      
     <HeroSection/>
      {/* Tabs Section */}
      <div className='container mx-auto px-4 mt-8'>
        <Tabs defaultValue="explore" className="w-full">

          {/* Tab Buttons */}
          <TabsList className="flex justify-center gap-4 bg-white shadow-md rounded-full p-2 max-w-[90%] mx-auto">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="deepdive">Deep Dive</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="experts">Experts</TabsTrigger>
          </TabsList>

          {/* TAB CONTENT GOES HERE */}
          <div className="mt-8">
            
            {/* Explore Tab Content */}
            <TabsContent value="explore">
              {/* Insert full Explore section here (as shared in last message) */}
              {/* Example: */}
              <section className="bg-white py-10">
                <div className="text-center max-w-2xl mx-auto px-4">
                  <h2 className="text-3xl font-semibold mb-4">Lorem, ipsum.</h2>
                  <p className="text-gray-600">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, voluptatem aliquid? Illum atque commodi asperiores saepe nesciunt necessitatibus, aliquam eos quam delectus veritatis beatae, corporis quas reiciendis accusantium, nostrum repellat?...
                  </p>
                 
                </div>
              </section>

              {/* Info Cards Section */}
<div className="mt-10 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

{/* Card 1 */}
<div className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
  <div className="flex justify-center mb-3">
    <div className="bg-blue-100 text-blue-500 p-2 rounded-full text-xl">
      ⛱️
    </div>
  </div>
  <h3 className="font-semibold text-lg mb-1">Travel for</h3>
  <p className="text-sm text-gray-500">Affordable | Beaches | Nature</p>
</div>

{/* Card 2 */}
<div className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
  <div className="flex justify-center mb-3">
    <div className="bg-purple-100 text-purple-500 p-2 rounded-full text-xl">
      📅
    </div>
  </div>
  <h3 className="font-semibold text-lg mb-1">Best time to visit</h3>
  <p className="text-sm text-gray-500">November to April</p>
</div>

{/* Card 3 */}
<div className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
  <div className="flex justify-center mb-3">
    <div className="bg-orange-100 text-orange-500 p-2 rounded-full text-xl">
      🗣️
    </div>
  </div>
  <h3 className="font-semibold text-lg mb-1">Speak</h3>
  <p className="text-sm text-gray-500">Vietnamese</p>
</div>

{/* Card 4 */}
<div className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition">
  <div className="flex justify-center mb-3">
    <div className="bg-green-100 text-green-500 p-2 rounded-full text-xl">
      💰
    </div>
  </div>
  <h3 className="font-semibold text-lg mb-1">Money Matters</h3>
  <p className="text-sm text-gray-500">Vietnamese Dong (₫)</p>
</div>

</div>

<section className="bg-white py-10">
                <div className="text-center max-w-2xl mx-auto px-4">
                 
                  <button className="mt-6 inline-flex items-center px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
                    Explore More →
                  </button>
                </div>
              </section>


            </TabsContent>

            {/* You can add other tab contents here too */}
            <TabsContent value="itinerary"><Itenary/></TabsContent>
            <TabsContent value="deepdive">Deep Dive</TabsContent>
            <TabsContent value="experiences"><Experiences/></TabsContent>
            <TabsContent value="experts">Content for Experts</TabsContent>
          
          </div>

        </Tabs>
      </div>

      <CustomizeTrip/>
    </div>
  )
}

export default Page
