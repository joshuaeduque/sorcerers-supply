"use client";
import { LoadingSpinner } from '@/components/ui/spinner';
import { SiteHeader } from "@/components/SiteHeader/site-header";
import { ProductCardFull } from "@/components/ProductCard/product-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { auth } from '@/app/firebase/config';
import { getAuth, signOut } from "firebase/auth";
import { getProductDocument  } from '@/app/firebase/getProduct';
import { ProductDocumentData } from "@/types/product-document-data";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';


export default function ProductPage() {
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productDocument, setProductDocument] = useState<DocumentSnapshot<DocumentData> | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const { collectionName, id } = useParams();
  
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
  
      if(id&&collectionName){
      setLoadingProducts(true);
      getProductDocument(collectionName.toString(),id.toString())
        .then(docSnap => {
          setProductDocument(docSnap);
          setLoadingProducts(false);
        });
      }else{
        console.log("Collection:", collectionName);
        console.log("Id:", id);
      }
      return () => {
        unsubscribe();
        };
      }, [id,collectionName]);
  
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
          <p>Product Page</p>
        </div>
        <div className="max-h-[80vh] p-[2rem] flex justify-center gap-20">
          {loadingProducts ? (
            <LoadingSpinner />
          ) : productDocument ? (
            <>
      {/* Left: Product Image */}
      <div className="max-h-[80vh] w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-full md:h-1/2 lg:h-1/2 xl:h-1/2">
            <ProductCardFull 
              key={productDocument.id}
              name={productDocument.data()?.name}
              price={productDocument.data()?.price}
              imageSrc={productDocument.data()?.imageSrc}
            />
          </div>
          {/* Right: Product Details */}
          <div className="max-h-[80vh] w-full md:w-1/2 lg:w-1/2 xl:w-1/2 min-h-full flex flex-col justify-end">
            <p className="text-2xl font-bold">{productDocument.data()?.name}</p>
            <p className="text-xl text-gray-500">${productDocument.data()?.price}</p>
            {productDocument.data()?.inStock ? (
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Buy Now
              </button>
            ) : (
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Out of Stock
              </button>
            )}
          </div>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    );
  }
  