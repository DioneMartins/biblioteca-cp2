import { initializeApp } from 'firebase/app';
import { collection, query, orderBy, getFirestore, doc, getDoc, getDocs } from 'firebase/firestore';

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

/*export async function getInitCards() {
  const result = [];
  try {
    const c = query(collection(database, 'books'), orderBy('title'));
    const querySnapshot = await getDocs(c);
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
  } catch (e) {
    result.push('Error fetching');
  } finally {
    return result;
  }
}*/
export async function getInitCards() {
  let result = [];
  try {
    const docRef = doc(database, 'displayInfo', 'homeCards');
    const docSnap = await getDoc(docRef);
    const res = docSnap.data();
    Object.keys(res).forEach((key) => {
      result.push(res[key]);
    });
  } catch (e) {
    result = e;
  } finally {
    return result;
  }
}
