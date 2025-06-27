import { Button } from '../ui/button';
import Image from 'next/image';
import { BStar, SStar } from '../ui/icons';
import Brands from './brand';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <>
      <div className="relative px-2 pt-6 bg-[#f2f0f1]  md:px-25 md:pt-20 overflow-hidden">
        {/* Content */}
        <div className="relative md:w-1/2 z-20">
          <h1 className="text-4xl md:text-7xl font-bold font-display">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-sm md:text-md pt-3 pb-3 text-[#616060] md:w-4/5 md:pt-5">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link href="">
            <Button
              className="rounded-full w-full h-13 mb-3 md:w-1/3 md:mt-5 
                                            transition-transform duration-200 ease-out
                                            hover:scale-105 active:scale-95
                                            shadow-md hover:shadow-lg active:shadow-inner"
            >
              Shop now
            </Button>
          </Link>
          <div className="flex justify-between md:px-0 px-10 mb-3 flex-wrap md:w-full h-[95px] md:mt-10 items-center gap-y-4">
            <span className="animate-in slide-in-from-bottom duration-700 delay-100">
              <p className="text-3xl md:text-5xl font-bold">200+</p>
              <p className="text-sm font-light text-[#616060]">
                International brands
              </p>
            </span>

            <svg
              className="animate-in fade-in duration-700 delay-200"
              width="2"
              height="52"
              viewBox="0 0 2 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="-2.18557e-08"
                x2="1"
                y2="52"
                stroke="black"
                strokeOpacity="0.1"
              />
            </svg>

            <span className="animate-in slide-in-from-bottom duration-700 delay-300">
              <p className="text-3xl md:text-5xl font-bold">2,000+</p>
              <p className="text-sm font-light text-[#616060]">
                High-Quality products
              </p>
            </span>

            <span className="hidden md:block animate-in fade-in duration-700 delay-400">
              <svg
                width="2"
                height="52"
                viewBox="0 0 2 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1"
                  y1="-2.18557e-08"
                  x2="1"
                  y2="52"
                  stroke="black"
                  strokeOpacity="0.1"
                />
              </svg>
            </span>

            <span className="mx-auto md:mx-0 animate-in slide-in-from-bottom duration-700 delay-500">
              <p className="text-3xl md:text-5xl font-bold">30,000+</p>
              <p className="text-sm font-light text-[#616060]">
                Happy customers
              </p>
            </span>
          </div>
        </div>
        {/* Ảnh nền */}
        <div className="md:absolute inset-0 w-full md:top-24 pt-30 h-95 z-0 flex justify-center items-center">
          <Image
            src="/assets/images/herosection.jpg"
            alt="herosection"
            width={450}
            height={600}
            className="object-cover object-top"
            priority
          />
        </div>

        <span className="absolute right-5 bottom-72 md:top-[50px] md:-translate-x-1/2 z-10 ">
          <BStar className="md:w-35 md:h-auto hover:animate-spin transition-transform duration-7000" />
        </span>
        <span className="absolute left-5 bottom-2/6 md:hidden z-10">
          <SStar />
        </span>
      </div>
      {/* Brands */}
      <Brands />
    </>
  );
};
export default HeroSection;
