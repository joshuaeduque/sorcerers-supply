import type { NextApiRequest, NextApiResponse } from "next";

const products = [
    { name: 'Big Wand', price: 4.99 },
    { name: 'Little Staff', price: 11.99 },
    { name: 'Cool Grimoire', price: 5.99 },
    { name: 'Water Scroll', price: 1.99 },
    { name: 'Fire Scroll', price: 2.99 },
    { name: 'Wind Scroll', price: 1.99 },
    { name: 'Pondering Orb', price: 3.99 }
];

export function get_products() {
    return products;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(products);
}