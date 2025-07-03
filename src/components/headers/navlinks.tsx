import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { getCategory } from '@/lib/action/category';
import { Category } from '@/types/category';

export default async function NavLinks() {
  const { data: links } = await getCategory();
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
            <ul className="grid z-50 gap-4 p-4 md:w-full lg:w-[500px] lg:grid-cols-[0.8fr_1.2fr] bg-white shadow-md rounded-md">
              {/* Các danh mục */}
              {links &&
                links.map((link: Category) => (
                  <li key={link.id}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className="block p-2 hover:bg-accent hover:text-accent-foreground rounded-md text-sm"
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className="text-md">
              On Sale
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className="text-md">
              New Arrivals
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Brands</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
