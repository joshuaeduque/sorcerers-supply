"use client";

import { LoadingSpinner } from '@/components/ui/spinner';
import { SiteHeader } from "@/components/site-header";
import { ProductCard } from "@/components/product-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { auth } from '@/app/firebase/config';
import { getProductDocuments } from '@/app/firebase/products';

import { ProductDocumentData } from "@/types/product-document-data";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";

export default function Home() {

  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productDocuments, setProductDocuments] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);

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

  return (
    <div>
      <SiteHeader authenticated={authenticated} onAuthClicked={() => { console.log('auth button clicked') }} />
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
      <div className="px-4 flex flex-wrap gap-4">
        {loadingProducts ? <LoadingSpinner/> : productDocuments.map((doc) => {
          const data = doc.data() as ProductDocumentData;
          return (
            <ProductCard
              key={doc.id}
              name={data.name}
              price={'$' + (data.cents / 100)}
            />
          );
        })}
      </div>
    </div>
  );
}