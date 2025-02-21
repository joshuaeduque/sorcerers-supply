"use client";

import { LoadingSpinner } from '@/components/ui/spinner';
import { SiteHeader } from "@/components/SiteHeader/site-header";
import { ProductCard } from "@/components/ProductCard/product-card";
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
      <div className="px-4 py-1 border-b border-gray-800 flex justify-start">
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