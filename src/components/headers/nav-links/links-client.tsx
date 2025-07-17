'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { CategoryNode } from '@/types/category';
import { ROUTES } from '@/config/routes';
import { cn } from '@/lib/utils';

type Props = {
  navLinks: CategoryNode[];
};

export default function NavLinksClient({ navLinks }: Props) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-md">
            Shop
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex">
            <div className="items-end flex flex-col md:h-full justify-between bg-muted p-4 rounded-lg">
              <div>
                <h3 className="text-lg font-bold mb-2">Discover</h3>
                <p className="text-sm text-muted-foreground">
                  Explore the latest arrivals and best-selling fashion pieces.
                </p>
              </div>
            </div>

            <ul className="grid gap-4 p-4 md:w-full lg:w-[500px] lg:grid-cols-[0.8fr_1.2fr] bg-white shadow-md rounded-md">
              {navLinks.map((link) => {
                const href = ROUTES.PRODUCT_CATEGORY(link.slug || '');
                const isActive = pathname.startsWith(href);

                return (
                  <li key={link.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={cn(
                          'block p-2 rounded-md text-sm transition',
                          isActive
                            ? 'bg-accent text-accent-foreground font-medium'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/"
              className={cn(
                'text-md',
                pathname === '/' ? 'text-primary font-semibold' : ''
              )}
            >
              On Sale
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/new-arrivals"
              className={cn(
                'text-md',
                pathname === '/new-arrivals' ? 'text-primary font-semibold' : ''
              )}
            >
              New Arrivals
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link
              href="/brands"
              className={cn(
                pathname === '/brands' ? 'text-primary font-semibold' : ''
              )}
            >
              Brands
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
