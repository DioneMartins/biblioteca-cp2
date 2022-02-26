import { initializeApp } from 'firebase/app';
import {
  collection,
  query,
  orderBy,
  getDocs,
  getFirestore,
  /* doc,
  getDoc,
  updateDoc, */
} from 'firebase/firestore';
import { updateProfile, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAFeKZUfV5XBuvnTyC8MyqDRauB5wUQyaU',
  authDomain: 'web-biblioteca-cp2tjk2.firebaseapp.com',
  projectId: 'web-biblioteca-cp2tjk2',
  storageBucket: 'web-biblioteca-cp2tjk2.appspot.com',
  messagingSenderId: '532696138107',
  appId: '1:532696138107:web:e54f090e91a9d9133cbdde',
  measurementId: 'G-C7XZ93RJNX',
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export async function getBookList() {
  const result = [];
  try {
    const q = query(collection(database, 'books'), orderBy('title'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
  } catch (e) {
    result.push('Error fetching');
  } finally {
    return result;
  }
}

export async function changeName(desiredName) {
  try {
    if (desiredName !== '') {
      updateProfile(getAuth().currentUser, {
        displayName: desiredName,
      });
    } else {
      return 'Erro';
    }
  } catch (e) {
    return 'Erro';
  } finally {
    return 'Finalizado';
  }
}
