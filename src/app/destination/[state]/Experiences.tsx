import Image from "next/image";

const experiences = [
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
    title: "Punjab Exploration",
    nights: "4 Nights 5 Days",
    price: "₹34,650",
    image: "/global/Punjab.webp",
  },
  {
    title: "Beauty of Punjab",
    nights: "6 Nights 7 Days",
    price: "₹38,445",
    image: "/global/Punjab.webp",
  },
 
];

const Experiences = () => {
  return (
    <div className="py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold mb-2">Experiences</h2>
      <p className="text-gray-500 mb-8">Experience More With Exclusive Offers </p>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {experiences.map((item, index) => (
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
  );
};

export default Experiences;
