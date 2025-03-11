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
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-3">
                    <p className="font-bold">Details</p>
                    <p className="font-bold">Price</p>
                    <p className="font-bold">Quantity</p>
                    {cartProducts.map((product, i) => (
                        <>
                            <p key={i}>{product.name}</p>
                            <p key={i + 1}>{product.price}</p>
                            <p key={i + 2}>{product.quantity}</p>
                        </>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}