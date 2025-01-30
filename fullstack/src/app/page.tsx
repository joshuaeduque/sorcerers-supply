'use client';

import { db } from '@/app/firebase/config';
import { LoadingSpinner } from '@/components/ui/spinner'

import { useEffect, useState } from 'react';
import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot } from 'firebase/firestore';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function Home() {
  const [productDocuments, setProductDocuments] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);

  useEffect(() => {

    const productsRef = collection(db, 'products');
    const q = query(productsRef);

    getDocs(q)
      .then(snapshot => {
        setProductDocuments(snapshot.docs);
      })
      .catch(err => console.log(err))

  }, []);

  return (
    <div className='p-4'>
      <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
        {productDocuments.length < 1 && <LoadingSpinner className='size-48'></LoadingSpinner>}
        {productDocuments.length > 0 &&
          productDocuments.map(product => (
            <Card key={product.id} className='dark w-48'>
              <CardHeader></CardHeader>
              <CardContent>
                <img className='rounded' src="/frog.png" alt="" />
              </CardContent>
              <CardFooter>
                <div>
                  <p>{product.data().name}</p>
                  <p>${product.data().price / 100}</p>
                </div>
              </CardFooter>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
