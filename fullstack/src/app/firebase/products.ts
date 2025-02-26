import { db } from '@/app/firebase/config'
import { collection, DocumentData, getDocs, QueryDocumentSnapshot,query,limit } from 'firebase/firestore'

const collectionNames = ["wands","spellBooks","staffs","scrolls","magicItems","ingredients","cursedItems","creatures"];


async function getProductDocuments(): Promise<QueryDocumentSnapshot<DocumentData>[]> {
    try {
        let allDocs: QueryDocumentSnapshot<DocumentData>[] = [];

        for (const collectionName of collectionNames) {
            const collectionRef = collection(db, collectionName);
            const limitedDocs = query(collectionRef,limit(3));
            const querySnapshot = await getDocs(limitedDocs);
            allDocs = [...allDocs, ...querySnapshot.docs]; 
        }

        return allDocs;
    } catch (error) {
        console.error("Error fetching product documents:", error);
        return [];
    }
}

export {getProductDocuments};