import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ShoppingCart, Search, WandSparkles } from 'lucide-react';
import { MouseEventHandler } from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"

interface SiteHeaderProps {
    authenticated?: boolean | null,
    onAuthClicked?: MouseEventHandler<HTMLButtonElement> | undefined
}

export function SiteHeader({authenticated, onAuthClicked} : SiteHeaderProps) {
    return (
        <div className="flex p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
                <WandSparkles/>
                <p>SORCERER&apos;S SUPPLY</p>
                <div className='hidden md:flex'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className='flex flex-col gap-2 m-1 mx-2 text-nowrap'>
                                        <li><NavigationMenuLink>Creatures</NavigationMenuLink></li>
                                        <li><NavigationMenuLink>Cursed Items</NavigationMenuLink></li>
                                        <li><NavigationMenuLink>Ingredients</NavigationMenuLink></li>
                                        <li><NavigationMenuLink>Magic Items</NavigationMenuLink></li>
                                        <li><NavigationMenuLink>Scrolls</NavigationMenuLink></li>
                                        <li><NavigationMenuLink>Spell Books</NavigationMenuLink></li>
                                        <li><NavigationMenuLink>Staffs</NavigationMenuLink></li>
                                        <li><NavigationMenuLink>Wands</NavigationMenuLink></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className='flex flex-col gap-2 m-1 mx-2 text-nowrap'>
                                        <li><NavigationMenuLink>List of brands here</NavigationMenuLink></li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                    <Input placeholder="Search products"></Input>
                    <Button variant="outline" size="icon">
                        <Search/>
                    </Button>
                </div>
                <Button onClick={onAuthClicked}>
                    {authenticated === null ? '...' : authenticated ? 'Sign out' : 'Log in'}
                </Button>
                <Button>
                    <ShoppingCart/> Cart
                </Button>
            </div>
        </div>
    );
}