import { initializeApp } from 'firebase/app';
import { collection, query, orderBy, getDocs, getFirestore, doc, getDoc } from 'firebase/firestore';
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
    const searchResult = await getBookListResults(item);
    const docsID = [];

    for (let i = 0; i < searchResult.length; i++) {
      docsID.push(searchResult[i].docID);
    }

    docsID.forEach((id) => {
      const docRef = doc(database, 'books', id);
      getDoc(docRef).then((r) => result.push(r.data()));
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
  const fuse = new Fuse(searcherArray, { shouldSort: true, threshold: 0.5, includeScore: true });
  const result = fuse.search(item);
  const finalResult = [];
  result.sort((a, b) => a.score > b.score);
  Object.keys(result).forEach((key) => {
    finalResult.push({
      index: result[key].refIndex,
      score: result[key].score,
      docID: res[result[key].refIndex].bookID,
    });
  });
  return finalResult;
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
