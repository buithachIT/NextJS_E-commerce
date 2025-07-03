'use client';
import Link from 'next/link';
import {
  ApplePay,
  FaceBook,
  Github,
  GooglePay,
  Insta,
  MasterCard,
  Paypal,
  Twitter,
  Visa,
} from '../ui/icons';
import { usePathname } from 'next/navigation';
import { footerLinks } from './footerData';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative w-full">
      <div className="w-full px-5 md:px-25 my-0 mx-auto">
        <div className="">
          <div className="bg-black rounded-3xl flex flex-col md:flex-row justify-between items-center px-6 py-8 md:px-16 md:py-11 mb-14">
            <h1 className="text-white text-4xl w-full mb-8 md:w-1/2 font-display">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h1>
            <form className="w-full md:w-1/3">
              <label
                className={`relative block`}
                htmlFor="email_footer"
              ></label>
              <input
                id="email_footer"
                className="bg-white text-black rounded-full w-full py-3 pl-14 mb-3"
                type="text"
                placeholder="Enter your email address"
              />
              <button className="bg-white text-black cursor-pointer hover:scale-105 shadow-md hover:shadow-lg active:shadow-inner rounded-full w-full py-3">
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-1/4 mb-6">
            <h1 className="text-4xl mb-6 font-display">AURORE</h1>
            <p className="text-lg mb-9 text-[#606060]">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="flex gap-4">
              <Twitter className="hover:scale-120 cursor-pointer" />
              <FaceBook className="hover:scale-120 cursor-pointer" />
              <Insta className="hover:scale-120 cursor-pointer" />
              <Github className="hover:scale-120 cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-2 text-md md:grid-cols-4 gap-x-10">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="mb-7 font-bold">{section.title}</h3>
                {section.links.map((label) => {
                  const isActive = pathname === label.link;

                  return (
                    <Link
                      key={label.label}
                      href={label.link}
                      className={`block mb-5 relative group w-fit transition ${
                        isActive
                          ? 'text-black font-semibold'
                          : 'hover:text-white'
                      }`}
                    >
                      <span
                        className={`relative after:content-[''] text-[#606060] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-black after:transition-all ${
                          isActive
                            ? 'after:w-full'
                            : 'after:w-0 group-hover:after:w-full'
                        }`}
                      >
                        {label.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <hr className="mt-12 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center pb-20">
          <div className="mb-4 md:mb-0 text-sm text-[#606060]">
            Aurore © 2025, All Rights Reserved
          </div>
          <div className="flex">
            <Visa width={66} height={49} />
            <MasterCard width={66} height={49} />
            <Paypal width={66} height={49} />
            <ApplePay width={66} height={49} />
            <GooglePay width={66} height={49} />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-[rgba(240,240,240,1)] -z-10 h-5/6"></div>
      </div>
    </footer>
  );
}
