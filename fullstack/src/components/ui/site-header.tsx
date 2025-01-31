import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ShoppingCart, Search, WandSparkles } from 'lucide-react';

export function SiteHeader() {
    return (
        <div className="flex p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
                <WandSparkles/>
                <p>SORCERER'S SUPPLY</p>
            </div>
            <div className="flex items-center gap-4 ml-auto">
                <div className='flex items-center gap-2'>
                    <Input placeholder='Search products'></Input>
                    <Button variant="outline" size="icon">
                        <Search/>
                    </Button>
                </div>
                <Button>
                    <ShoppingCart/> Cart
                </Button>
            </div>
        </div>
    );
}