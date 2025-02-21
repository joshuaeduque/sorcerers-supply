import { db } from '@/app/firebase/config'
import { collection, DocumentData, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'

async function getProductDocuments(): Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]> {
    const querySnapshot = await getDocs(collection(db, 'creatures'));
    return querySnapshot.docs;
};

export {getProductDocuments};