import { initializeApp } from 'firebase/app';
import { collection, query, get, orderBy, getDocs, getFirestore } from 'firebase/firestore';

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

  /*const reference = ref(database);
  return get(child(reference, '/books/results'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const result = snapshot.val();
        return result;
      } else {
        return 'No data available';
      }
    })
    .catch(() => {
      return 'Error fetching, try again';
    });*/
}

export async function getInitCards() {
  const reference = ref(database);
  return get(child(reference, '/displayInfo/homeCards/results'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const result = snapshot.val();
        return result;
      } else {
        return 'No data available';
      }
    })
    .catch(() => {
      return 'Error fetching, try again';
    });
}
