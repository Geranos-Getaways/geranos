import Image from 'next/image';
import React from 'react'
import CustomTripModal from './CustomTripModal';


const CustomizeTrip = () => {
    return (
        <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center justify-between mt-12">
          {/* Left Section */}
          <div className="flex items-start gap-6 flex-1 mr-5">
            {/* Avatar Stack */}
            <div className="relative w-12 h-12">
              <Image
                src="/global/Punjab.webp"
                alt="Expert"
                width={48}
                height={48}
                className="rounded-full border-2 border-white z-30 absolute"
              />
              <Image
               src="/global/Punjab.webp"
                alt="Expert"
                width={48}
                height={48}
                className="rounded-full border-2 border-white z-20 absolute left-6"
              />
              <Image
               src="/global/Punjab.webp"
                alt="Expert"
                width={48}
                height={48}
                className="rounded-full border-2 border-white z-10 absolute left-12"
              />
            </div>
    
            {/* Message Content */}
            <div className='ml-8'>
              <h3 className="text-lg font-semibold mb-1">Want a customized Experience?</h3>
              <p className="text-sm text-gray-500">
                Get in touch with our Expert who knows the destination better than anyone!
              </p>
    
              {/* Highlights */}
              <div className="flex gap-6 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-100 rounded-full" />
                  <p className="text-sm text-gray-600">Customize travel</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-100 rounded-full" />
                  <p className="text-sm text-gray-600">Deep destination knowledge</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-orange-100 rounded-full" />
                  <p className="text-sm text-gray-600">Personalized assistance</p>
                </div>
              </div>
            </div>
          </div>
    
          {/* CTA Button */}
          <div className="mt-6 md:mt-0 md:ml-8">
            <CustomTripModal/>
           
          </div>
        </div>
      );
    };
    

export default CustomizeTrip