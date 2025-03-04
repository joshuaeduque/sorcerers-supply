'use client';

import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/SiteHeader/site-header";
import { ProductCard } from "@/components/ProductCard/product-card";

import { getProducts, Product } from "../firebase/products";

export default function Search() {

    const [products, setProducts] = useState<Product[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getProducts().then(products => {
            setProducts(products)
        }).catch(_ => {
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <SiteHeader onSearchClicked={_=>{console.log('search clicked')}} />
            <div className="m-4">
                {loading && <div>Loading...</div>}
                {error && <div>An error occured</div>}
                {!loading && !error && products &&
                    <div>
                        <p>Products</p>
                        <div className="flex flex-wrap gap-4">
                            {products.map(product => { return <ProductCard key={product.id} name={product.name} price={product.price} imageSrc={product.imageSrc} /> })}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}