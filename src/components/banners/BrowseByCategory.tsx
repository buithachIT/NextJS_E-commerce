import Image from 'next/image';
export default function BrowseByCategory() {
  return (
    <section className="mx-auto px-4 md:px-20 w-full ">
      <div className="bg-[#f6f6f6] md:px-25 rounded-3xl">
        <h2 className="text-3xl md:text-5xl font-bold text-center pt-10 mb-10 font-display">
          BROWSE BY DRESS STYLE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Casual */}
          <div className="md:col-span-1 relative md:aspect-[4/3] aspect-video rounded-xl cursor-pointer overflow-hidden bg-white shadow hover:shadow-xl transition">
            <div className="absolute top-4 left-4 z-10 bg-white/80 px-4 py-2 text-black text-lg font-semibold rounded-md">
              Casual
            </div>
            <Image
              src="/assets/images/banner/casual.png"
              alt="Casual"
              fill
              className="object-cover object-right scale-125"
            />
          </div>

          {/* Formal */}
          <div className="md:col-span-2 relative aspect-video md:aspect-auto rounded-xl cursor-pointer overflow-hidden bg-white shadow hover:shadow-xl transition">
            <Image
              src="/assets/images/banner/formal.png"
              alt="Formal"
              fill
              className="object-cover translate-x-45 object-[center_20%] md:scale-100 scale-140"
            />
            <div className="absolute top-4 left-4 bg-opacity-80 px-4 py-2 text-black text-lg font-semibold">
              Formal
            </div>
          </div>

          {/* Party */}
          <div className="md:col-span-2 relative aspect-video md:aspect-auto rounded-xl cursor-pointer overflow-hidden bg-white shadow hover:shadow-xl transition">
            <Image
              src="/assets/images/banner/party.png"
              alt="Party"
              fill
              className="object-cover object-[center_40%] translate-x-20 scale-110"
            />
            <div className="absolute top-4 left-4 bg-opacity-80 px-4 py-2 text-black text-lg font-semibold">
              Party
            </div>
          </div>

          {/* Gym */}
          <div className="md:col-span-1 relative md:aspect-[4/3] aspect-video rounded-xl cursor-pointer overflow-hidden bg-white shadow hover:shadow-xl transition">
            <Image
              src="/assets/images/banner/gym.png"
              alt="Gym"
              fill
              className="object-cover object-[center_40%] translate-x-15"
            />
            <div className="absolute top-4 left-4 bg-opacity-80 px-4 py-2 text-black text-lg font-semibold">
              Gym
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
