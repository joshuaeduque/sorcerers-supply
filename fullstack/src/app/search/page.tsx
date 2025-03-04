'use client';

import { SiteHeader } from "@/components/SiteHeader/site-header";
import { useEffect, useState } from "react";
import { getProductDocuments } from "../firebase/products";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { ProductCard } from "@/components/ProductCard/product-card";

export default function Search() {

    const [products, setProducts] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getProductDocuments().then(products => {
            setProducts(products)
        }).catch(_ => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <SiteHeader />
            <div className="m-4">
                {loading && <div>Loading...</div>}
                {error && <div>An error occured</div>}
                {!loading && !error && products &&
                    <div>
                        <p>Products</p>
                        <div className="flex flex-wrap gap-4">
                            {products.map(product => { return <ProductCard key={product.id} name={""} price={99} /> })}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}