'use client';
import { useState } from 'react';
import { MobileToggle, CloseIcon } from '../ui/icons';
import Link from 'next/link';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/sale', label: 'On Sale' },
  { href: '/new', label: 'New Arrivals' },
  { href: '/brands', label: 'Brands' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label="Open mobile menu"
        onClick={() => setOpen(true)}
        className="p-2"
      >
        <MobileToggle />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-white shadow-lg p-6 flex flex-col">
            <button
              aria-label="Close mobile menu"
              onClick={() => setOpen(false)}
              className="self-end mb-6"
            >
              <CloseIcon />
            </button>
            <nav className="flex-1 flex flex-col justify-center items-center">
              <ul className="w-full flex flex-col gap-6">
                {links.map((link) => (
                  <li key={link.href} className="w-full">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block w-full text-center py-3 px-4 text-lg font-semibold rounded transition-colors duration-200 hover:bg-gray-100 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
