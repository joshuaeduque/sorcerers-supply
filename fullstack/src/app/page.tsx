"use client";

import { SiteHeader } from "@/components/ui/site-header";

import { getProductDocuments } from '@/app/firebase/products';
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

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
      <div className="p-4">

      </div>
      <div>

      </div>
    </div>
  );
}