"use client";

import { SiteHeader } from "@/components/ui/site-header";
import { ProductCard } from "@/components/ui/product-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getProductDocuments } from '@/app/firebase/products';
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ProductDocumentData } from "@/types/product-document-data";

export default function Home() {

  const [productDocuments, setProductDocuments] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);

  useEffect(() => {
    getProductDocuments()
      .then(docs => {
        setProductDocuments(docs);
      });
  }, []);

  return (
    <div>
      <SiteHeader />
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
        {productDocuments.map((doc, i) => {
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