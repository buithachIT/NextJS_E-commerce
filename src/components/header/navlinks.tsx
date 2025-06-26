import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";

export default function NavLinks() {

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href='/shop'><NavigationMenuTrigger className="text-md">Shop</NavigationMenuTrigger></Link>
                    <NavigationMenuContent>
                        <ul className="grid z-50 gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                        href="/blog/category"
                                    >
                                        <div className="mt-4 mb-2 text-lg font-medium">Category</div>
                                        <p className="text-muted-foreground text-md leading-tight">
                                            Category of posts
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/" className="text-md">On Sale</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/about-us" className="text-md">New Arrivals</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem >
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/about-us" >Brands</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}