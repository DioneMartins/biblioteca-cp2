import { initializeApp } from 'firebase/app';
import {
  collection,
  query,
  orderBy,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  /* updateDoc, */
} from 'firebase/firestore';
import { updateProfile, getAuth } from 'firebase/auth';
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
  const finalResult = [];

  try {
    const res = await getBookListResults(item);
    for (const id of res) {
      const docRef = doc(database, 'books', id);
      const docSnap = await getDoc(docRef);
      finalResult.push(docSnap.data());
    }
  } catch (e) {
    finalResult.push('No books or error fetching');
  } finally {
    return finalResult;
  }
}

async function getBookListResults(item) {
  const res = await getBookLinks();
  let searcherBookArray = [];
  let searcherAuthorArray = [];

  Object.keys(res).forEach((key) => {
    searcherBookArray.push(res[key].bookName);
  });
  Object.keys(res).forEach((key) => {
    searcherAuthorArray.push(res[key].authorName);
  });

  const bookFuse = new Fuse(searcherBookArray, {
    shouldSort: true,
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true,
  });
  const bookRes = bookFuse.search(item);
  const authFuse = new Fuse(searcherAuthorArray, {
    shouldSort: true,
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true,
  });
  const authRes = authFuse.search(item);

  const result = bookRes;
  authRes.forEach((item) => {
    let hasEqual = false;
    for (let i = 0; i < bookRes.length; i++) {
      if (!hasEqual)
        if (item.refIndex === bookRes[i].refIndex) {
          if (item.score < bookRes[i].score) {
            bookRes[i].score = item.score;
          }
          hasEqual = true;
          break;
        }
    }
    if (!hasEqual) result.push(item);
  });
  result.sort((a, b) => a.score - b.score);
  const finalResult = [];
  result.forEach((item) => finalResult.push(res[item.refIndex].bookID));
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

export async function getUserName(userUID) {
  let result = '';
  try {
    const docRef = doc(database, 'users', userUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      result = docSnap.data().name;
    } else {
      result = 'Anônimo';
    }
  } catch (e) {
    result = 'Erro';
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
