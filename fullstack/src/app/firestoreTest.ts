import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addTestData = async () => {
  try {
    const docRef = await addDoc(collection(db, 'testCollection'), {
      name: 'Test Name',
      value: 'Test Value'
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getTestData = async () => {
  const querySnapshot = await getDocs(collection(db, 'testCollection'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};