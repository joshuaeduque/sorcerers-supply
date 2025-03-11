"use client";

import { LoadingSpinner } from '@/components/ui/spinner';
import { SiteHeader } from "@/components/SiteHeader/site-header";
import { ProductCard } from "@/components/ProductCard/product-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { auth } from '@/app/firebase/config';
import { getProducts, Product } from '@/app/firebase/products';
import { useToast } from '@/hooks/use-toast';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from "firebase/auth";
import { CartSheet } from '@/components/CartSheet/cart-sheet';

export default function Home() {

  const { toast } = useToast();
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    // Get Firebase authentication
    const unsubscribe = auth.onAuthStateChanged(user => {
      setAuthenticated(user ? true : false);
    });

    // Get products from Firestore
    getProducts()
      .then(products => setProducts(products))
      .catch(_ => { setError(true) })
      .finally(() => { setLoading(false) });

    // Clean up auth callback
    return () => { unsubscribe() }
  }, []);

  const handleAuthClicked = async () => {
    const auth = getAuth();

    // Check for authentication status
    if (!authenticated) {
      // User isn't logged in, go to login page
      router.push('/login');

      return;
    }
    else {
      // User is logged in, try signing out
      try {
        await signOut(auth);

        toast({
          title: "Signed out",
          variant: "success",
          description: "You have been signed out.",
        });

        router.push('/');
      }
      catch (error) {
        console.error(error);

        toast({
          title: "Sign out failed",
          variant: "destructive",
          description: "Please try again.",
        });
      }
    }
  };

  const handleCartClicked = () => {
    setCartOpen(true);
  };

  return (
    <div>
      <SiteHeader authenticated={authenticated} onAuthClicked={handleAuthClicked} onCartClicked={handleCartClicked} />
      <div className="px-4 py-1 border-b border-gray-800 flex justify-end">
        <DropdownMenu >
          <DropdownMenuTrigger>Sort by</DropdownMenuTrigger>
          <DropdownMenuContent className='dark'>
            <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='m-4'>
        <p>Products</p>

        {loading && <LoadingSpinner />}
        {error && <p>There was an error loading the products</p>}
        {!loading && !error && products &&
          <div className='my-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 place-items-center'>
            {products.map(product => (
              <ProductCard key={product.id} name={product.name} price={product.price} imageSrc={product.imageSrc} />
            ))}
          </div>}
      </div>

      <CartSheet onOpenChange={setCartOpen} open={cartOpen} />
    </div>
  );
}