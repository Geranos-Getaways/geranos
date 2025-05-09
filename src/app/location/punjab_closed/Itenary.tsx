import Image from "next/image";

const itineraries = [
  {
    title: "Punjab Grand Tour",
    nights: "10 Nights 11 Days",
    price: "₹96,800",
    image: "/global/Punjab.webp",
  },
  {
    title: "Punjab Discovery",
    nights: "3 Nights 4 Days",
    price: "₹22,550",
    image: "/global/Punjab.webp",
  },
  {
    title: "Punjab Discovery",
    nights: "3 Nights 4 Days",
    price: "₹22,550",
    image: "/global/Punjab.webp",
  },
  {
    title: "Punjab Discovery",
    nights: "3 Nights 4 Days",
    price: "₹22,550",
    image: "/global/Punjab.webp",
  },
 
];

const Itenary = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
    
    {/* Tour Packages */}
    <div className="py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold mb-2">Tour Packages</h2>
      <p className="text-gray-500 mb-8">Current favourites for travellers like you</p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {itineraries.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <div className="relative w-full h-52">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl"
              />
              <div className="absolute bottom-4 left-4 text-white z-10">
                <h3 className="text-lg font-semibold drop-shadow">{item.title}</h3>
                <p className="text-xs uppercase tracking-wide">Punjab</p>
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-t-2xl" />
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500">{item.nights}</p>
              <p className="text-xs uppercase text-gray-400">Starting From</p>
              <p className="text-lg font-semibold text-gray-800">{item.price} <span className="text-sm font-light">per person</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>

   {/* Tour Packages */}
    <div className="py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold mb-2">Weekend Gateaways</h2>
      <p className="text-gray-500 mb-8">Current favourites for travellers like you</p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {itineraries.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <div className="relative w-full h-52">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl"
              />
              <div className="absolute bottom-4 left-4 text-white z-10">
                <h3 className="text-lg font-semibold drop-shadow">{item.title}</h3>
                <p className="text-xs uppercase tracking-wide">Punjab</p>
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-t-2xl" />
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500">{item.nights}</p>
              <p className="text-xs uppercase text-gray-400">Starting From</p>
              <p className="text-lg font-semibold text-gray-800">{item.price} <span className="text-sm font-light">per person</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>

   {/* Activities */}
    <div className="py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold mb-2">Activities</h2>
      <p className="text-gray-500 mb-8">Current favourites for travellers like you</p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {itineraries.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <div className="relative w-full h-52">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl"
              />
              <div className="absolute bottom-4 left-4 text-white z-10">
                <h3 className="text-lg font-semibold drop-shadow">{item.title}</h3>
                <p className="text-xs uppercase tracking-wide">Punjab</p>
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-t-2xl" />
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500">{item.nights}</p>
              <p className="text-xs uppercase text-gray-400">Starting From</p>
              <p className="text-lg font-semibold text-gray-800">{item.price} <span className="text-sm font-light">per person</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Itenary;
