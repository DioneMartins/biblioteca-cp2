import { initializeApp } from 'firebase/app';
import {
  collection,
  query,
  orderBy,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
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
      result.push(doc);
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
      finalResult.push(docSnap);
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

  const options = {
    shouldSort: true,
    threshold: 0.4,
    includeScore: true,
    ignoreLocation: true,
  };

  const bookFuse = new Fuse(searcherBookArray, options);
  const bookRes = bookFuse.search(item);
  const authFuse = new Fuse(searcherAuthorArray, options);
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

export async function updateBook(id) {
  try {
    const docRef = doc(database, 'books', id);
    await updateDoc(docRef, {
      capital: true,
    });
  } catch (e) {
    return 'Erro';
  } finally {
    return 'Finalizado';
  }
}

export async function addBook(afn, aln, barcode, icn, notes, quant, title) {
  let id = '';
  try {
    const secondRef = doc(database, 'bookLinks', 'allBooks');
    const docSnap = await getDoc(secondRef);

    let searcherArray = [];
    const res = docSnap.data().results;
    Object.keys(res).forEach((key) => {
      searcherArray.push(res[key].title);
    });
    const fuse = new Fuse(searcherArray, {
      threshold: 0,
    });
    const searchRes = fuse.search(title);

    if (searchRes.length === 0) {
      const docRef = await addDoc(collection(database, 'books'), {
        afn: afn,
        aln: aln,
        barcode: barcode,
        icn: icn,
        notes: notes,
        quant: quant,
        title: title,
      });

      let counter;
      let lastBook;
      counter = docSnap.data().count;
      lastBook = docSnap.data().lastBook;
      const author = `${afn} ${aln}`;
      id = docRef.id;

      await updateDoc(secondRef, {
        count: counter++,
        lastBook: lastBook++,
        [`results.${counter}`]: {
          authorName: author,
          bookName: title,
          bookID: id,
        },
      });
    } else id = 'Error';
  } catch (e) {
    console.log(e);
    return 'Error';
  } finally {
    return id;
  }
}

export async function deleteBook(id) {
  await deleteDoc(doc(database, 'books', id));

  let counter;
  const docRef = doc(database, 'bookLinks', 'allBooks');

  let searcherArray = [];
  const docSnap = await getDoc(docRef);
  const res = docSnap.data().results;

  Object.keys(res).forEach((key) => {
    searcherArray.push(res[key].bookID);
  });
  const fuse = new Fuse(searcherArray, {
    threshold: 0,
  });
  const searchRes = fuse.search(id);

  counter = docSnap.data().count;
  let lastBook = docSnap.data().lastBook;
  if (docSnap.data().lastBook === searchRes[0].refIndex) {
    lastBook = lastBook--;
  }

  await updateDoc(docRef, {
    count: counter--,
    lastBook: lastBook,
    [`results.${searchRes[0].refIndex}`]: {},
  });
}
