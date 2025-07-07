'use client';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { MobileToggle, CloseIcon } from '../ui/icons';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const categories = [
  { href: '/category/gucci', label: 'Gucci' },
  { href: '/category/prada', label: 'Prada' },
  { href: '/category/versace', label: 'Versace' },
  { href: '/category/dior', label: 'Dior' },
  { href: '/category/calvinklein', label: 'Calvin Klein' },
];

const links = [
  { href: '/shop', label: 'Shop', children: categories },
  { href: '/sale', label: 'On Sale' },
  { href: '/new', label: 'New Arrivals' },
  { href: '/brands', label: 'Brands' },
];

export default function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open mobile menu">
            <MobileToggle />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 w-2/3 max-w-xs">
          <VisuallyHidden>
            <SheetTitle>Mobile Navigation</SheetTitle>
          </VisuallyHidden>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-end mb-6">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close mobile menu"
                >
                  <CloseIcon />
                </Button>
              </SheetClose>
            </div>
            <nav className="flex-1 flex flex-col justify-center items-center">
              <ul className="w-full flex flex-col gap-2">
                <Accordion type="single" collapsible className="w-full">
                  {links.map((link) =>
                    link.children ? (
                      <AccordionItem value={link.label} key={link.label}>
                        <AccordionTrigger className="w-full text-lg font-semibold px-4 py-3 text-left">
                          {link.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="flex flex-col gap-1 pl-4">
                            {link.children.map((cat) => (
                              <li key={cat.href}>
                                <SheetClose asChild>
                                  <Link
                                    href={cat.href}
                                    className="block py-2 px-2 rounded hover:bg-gray-100 hover:text-primary"
                                  >
                                    {cat.label}
                                  </Link>
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <li key={link.href} className="w-full">
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className="block w-full text-center py-3 px-4 text-lg font-semibold rounded transition-colors duration-200 hover:bg-gray-100 hover:text-primary"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    )
                  )}
                </Accordion>
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
