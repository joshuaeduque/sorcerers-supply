import { doc, getDoc } from "firebase/firestore";
import { db } from './config';

export async function getProductDocument(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap;
  } else {
    console.log("No such product!");
    throw new Error("No such product!");
  }
}