import Link from 'next/link';
import { MouseEventHandler } from 'react';
import { ShoppingCart, Search, WandSparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SiteHeaderProps {
    authenticated?: boolean | null,
    onAuthClicked?: MouseEventHandler<HTMLButtonElement>,
    onSearchClicked?: MouseEventHandler<HTMLButtonElement>,
    onCartClicked?: MouseEventHandler<HTMLButtonElement>
}

export function SiteHeader({authenticated, onAuthClicked, onSearchClicked, onCartClicked} : SiteHeaderProps) {
    return (
        <div className="flex p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
                <WandSparkles/>
                <Link href={"/"}>SORCERER&apos;S SUPPLY</Link>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                    <Input placeholder="Search products"></Input>
                    <Button variant="outline" size="icon" onClick={onSearchClicked}>
                        <Search/>
                    </Button>
                </div>
                <Button onClick={onAuthClicked}>
                    {authenticated === null ? '...' : authenticated ? 'Sign out' : 'Log in'}
                </Button>
                <Button onClick={onCartClicked}>
                    <ShoppingCart/> Cart
                </Button>
            </div>
        </div>
    );
}