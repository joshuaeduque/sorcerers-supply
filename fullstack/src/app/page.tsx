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
import { Card, CardContent } from "@/components/ui/card"


import { auth } from '@/app/firebase/config';
import { getProductDocuments } from '@/app/firebase/products';

import { ProductDocumentData } from "@/types/product-document-data";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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

  const images = [
    '/depositphotos_227387246-stock-photo-photo-of-three-witches-with.jpg',
    '/gettyimages-175543914-612x612.jpg',
    '/gettyimages-1186887201-612x612.jpg'
  ];

  return (
    <div>
      <SiteHeader authenticated={authenticated} />
      <div className='flex justify-center'>
        <Carousel className='w-full max-w-xl'>
          <CarouselContent>
            {images.map((value, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center">
                      <img src={value} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="px-4 py-2">
        <p>Products</p>
      </div>
      <div className="px-4 flex flex-wrap gap-4">
        {loadingProducts ? <LoadingSpinner /> : productDocuments.map((doc) => {
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