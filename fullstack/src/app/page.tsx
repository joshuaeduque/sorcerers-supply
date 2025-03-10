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
import { getAuth, signOut } from "firebase/auth";
import { getProductDocuments } from '@/app/firebase/products';

import { ProductDocumentData } from "@/types/product-document-data";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";

import { useToast } from '@/hooks/use-toast';

import { useRouter } from 'next/navigation';

export default function Home() {

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productDocuments, setProductDocuments] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);
  const { toast } = useToast();
  const router = useRouter(); 

  useEffect(() => {
    // Get Firebase authentication
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      }
      else {
        setAuthenticated(false);
      }
    });

    // Get products from Firestore
    setLoadingProducts(true);

    getProductDocuments()
      .then(docs => {
        setProductDocuments(docs);
        setLoadingProducts(false);
      });

    return () => { unsubscribe() }
  }, []);

  const handleClick = async () => {
    const auth = getAuth();

    if (!authenticated) {
      router.push('/login');
      return;
    }
    else {
      try {
        await signOut(auth);
        toast({
          title: "Signed out",
          variant: "success",
          description: "You have been signed out.",
        });
        router.push('/');
      } catch (error) {
        console.error(error);
        toast({
          title: "Sign out failed",
          variant: "destructive",
          description: "Please try again.",
        });
      }
    }
  };

  return (
    <div>
      <SiteHeader authenticated={authenticated} onAuthClicked={handleClick} />
      <div className="px-4 py-1 border-b border-gray-800 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>Sort by</DropdownMenuTrigger>
          <DropdownMenuContent className="dark">
            <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
            <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-4 py-2">
        <p>Products</p>
      </div>
      <div className="p-[2rem] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 place-items-center">
        {loadingProducts ? (
          <LoadingSpinner />
        ) : (
          productDocuments.map((doc) => {
            const data = doc.data();
            return (
              <div
                key={doc.id}
                onClick={() =>
                  router.push(`/productPage/${data.collectionName}/${doc.id}`)
                }
                style={{ cursor: "pointer" }}
              >
                <ProductCard
                  name={data.name}
                  price={data.price}
                  imageSrc={data.imageSrc}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );  
}