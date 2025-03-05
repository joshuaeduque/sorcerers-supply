import { db } from '@/app/firebase/config';
import { collection, DocumentData, getDocs, QueryDocumentSnapshot } from 'firebase/firestore';

const collectionNames = ["wands", "spellBooks", "staffs", "scrolls", "magicItems", "ingredients", "cursedItems", "creatures"];

async function getAllProductDocuments(): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  try {
    let allDocs: QueryDocumentSnapshot<DocumentData>[] = [];

    for (const collectionName of collectionNames) {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      allDocs = [...allDocs, ...querySnapshot.docs];
    }

    return allDocs;
  } catch (error) {
    console.error("Error fetching all product documents:", error);
    return [];
  }
}

export { getAllProductDocuments };
