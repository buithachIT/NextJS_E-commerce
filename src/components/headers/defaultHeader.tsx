import { SearchIcon } from '../ui/icons';
import NavLink from './nav-links/navlinks';
import SearchBox from '@/components/headers/search';
import MobileNav from './mobileNav';
import Link from 'next/link';
import UserHeader from './userNav';
import { Suspense } from 'react';

const DefaultHeader = () => {
  return (
    <>
      <div className="w-full flex justify-between px-5 md:px-20 h-[100px]">
        <div className="flex items-center md:mr-2">
          <div className="md:hidden pr-5">
            <MobileNav />
          </div>
          <Link href="/">
            <h1
              className={`font-bold font-display text-3xl md:text-4xl md:ml-5 pb-2 md:mr-5`}
            >
              AURORE
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center ">
          <Suspense fallback={<p>Loading...</p>}>
            <NavLink />
          </Suspense>
        </div>
        <div className="flex items-center w-full">
          <SearchBox />
        </div>
        <div className="flex w-1/2 items-center justify-end">
          <span className="md:hidden">
            <SearchIcon className="w-10 h-6 cursor-pointer hover:scale-110" />
          </span>
          <UserHeader />
        </div>
      </div>
      <hr className="border-t border-gray-200" />
    </>
  );
};
export default DefaultHeader;
