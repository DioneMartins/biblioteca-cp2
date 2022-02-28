import { initializeApp } from 'firebase/app';
import {
  collection,
  query,
  orderBy,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  where,
} from 'firebase/firestore';
import Fuse from 'fuse.js';

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

export async function getSearchedBooks(item) {
  const result = [];
  try {
    const searchQuery = await getBookListResults(item);
    const q = query(collection(database, 'books'), where('title', 'in', searchQuery));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
  } catch (e) {
    result.push('No books or error fetching');
  } finally {
    return result;
  }
}

async function getBookListResults(item) {
  const res = await getBookLinks();
  let searcherArray = [];
  Object.keys(res).forEach((key) => {
    searcherArray.push(res[key].bookName);
  });
  const fuse = new Fuse(searcherArray, { shouldSort: true, threshold: 0.5 });
  const result = fuse.search(item);
  const returnResult = [];
  Object.keys(result).forEach((key) => {
    returnResult.push(result[key].item);
  });
  return returnResult;
}

async function getBookLinks() {
  let result = '';
  try {
    const docRef = doc(database, 'bookLinks', 'allBooks');
    const docSnap = await getDoc(docRef);
    result = docSnap.data().results;
  } catch (e) {
    result = e;
  } finally {
    return result;
  }
}
