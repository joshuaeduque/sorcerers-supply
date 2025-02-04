import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ShoppingCart, Search, WandSparkles } from 'lucide-react';
import { MouseEventHandler } from 'react';

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
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                    <Input className='dark' placeholder="Search products"></Input>
                    <Button className='dark' variant="outline" size="icon">
                        <Search/>
                    </Button>
                </div>
                <Button className='dark' onClick={onAuthClicked}>
                    {authenticated === null ? '...' : authenticated ? 'Sign out' : 'Log in'}
                </Button>
                <Button className='dark'>
                    <ShoppingCart/> Cart
                </Button>
            </div>
        </div>
    );
}