import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { DialogProps } from "@radix-ui/react-dialog";
import { CartCard } from "../CartCard/cart-card";
import { ProductCard } from "../ProductCard/product-card";
import { ChevronLeft, ChevronRight, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CartProduct {
    name: string,
    price: number,
    quantity: number
}

const cartProducts: CartProduct[] = [
    { name: 'Magic Wand', price: 99, quantity: 1 },
    { name: 'Big Staff', price: 215, quantity: 2 },
    { name: 'Weird Rock', price: 912, quantity: 5 }
];

export function CartSheet({ ...rest }: DialogProps) {
    return (
        <Sheet {...rest}>
            <SheetContent className="dark">
                <SheetHeader className="mb-4">
                    <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 ">
                    <div className="grid grid-cols-[auto,auto,auto] gap-4">
                        <p className="font-bold">Details</p>
                        <p className="font-bold">Price</p>
                        <p className="font-bold">Quantity</p>
                        {cartProducts.map((product, i) => (
                            <>
                                <div className="flex items-center gap-2">
                                    <img className="aspect-square w-12 invert" src="/next.svg" />
                                    <p>{product.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <p>${product.price / 100}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="outline" size="icon"><ChevronLeft /></Button>
                                    <p>{product.quantity}</p>
                                    <Button variant="outline" size="icon"><ChevronRight /></Button>
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Button className="dark w-full"><ShoppingBasket />Checkout</Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}