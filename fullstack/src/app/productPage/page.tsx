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
import { getAllProductDocuments } from '@/app/firebase/allProducts';
import { ProductDocumentData } from "@/types/product-document-data";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function ProductPage() {
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productDocuments, setProductDocuments] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const { toast } = useToast();
  
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
  
      getAllProductDocuments()
        .then(docs => {
          setProductDocuments(docs);
          setLoadingProducts(false);
        });
  
      return () => { unsubscribe() }
    }, []);
    const handleClick = async () => {
      const authInstance = getAuth();
      if (!authenticated) {
        router.push('/login');
        return;
      }
      try {
        await signOut(authInstance);
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
    };
  
    return (
      <div>
        {/* Place the header at the top */}
        <SiteHeader authenticated={authenticated} onAuthClicked={handleClick} />
        
        {/* Rest of your product page content */}
        <div className="px-4 py-2">
          <p>Products</p>
        </div>
        <div className="p-[2rem] grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 place-items-center">
        {loadingProducts ? <LoadingSpinner/> : productDocuments.map((doc) => {
          const data = doc.data() as QueryDocumentSnapshot<ProductDocumentData>;
          return (
            <ProductCard
            key={doc.id}
            name={doc.data().name}
            price={ doc.data().price }
            imageSrc={ doc.data().imageSrc }
            />
          );
        })}       
         </div>
      </div>
    );
  }
  