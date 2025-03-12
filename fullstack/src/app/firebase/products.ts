import { db } from '@/app/firebase/config'
import { collection, DocumentData, getDocs, QueryDocumentSnapshot, query, limit } from 'firebase/firestore'

const collectionNames = ["wands", "spellBooks", "staffs", "scrolls", "magicItems", "ingredients", "cursedItems", "creatures"];

interface Product {
    id: string,
    imageSrc: string,
    name: string,
    price: number
};

async function getProducts(): Promise<Product[]> {
    const docs = await getProductDocuments();
    return docs.map(doc => ({
        id: doc.id,
        imageSrc: doc.data().imageSrc,
        name: doc.data().name,
        price: doc.data().price
    }));
}

async function getProductDocuments(): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    try {
        let allDocs: QueryDocumentSnapshot<DocumentData>[] = [];

        for (const collectionName of collectionNames) {
            const collectionRef = collection(db, collectionName);
            const limitedDocs = query(collectionRef, limit(3));
            const querySnapshot = await getDocs(limitedDocs);
            allDocs = [...allDocs, ...querySnapshot.docs];
        }

        return allDocs;
    } catch (error) {
        console.error("Error fetching product documents:", error);
        return [];
    }
}

export { getProductDocuments, getProducts };

export type { Product };