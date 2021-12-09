import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAFeKZUfV5XBuvnTyC8MyqDRauB5wUQyaU',
  authDomain: 'web-biblioteca-cp2tjk2.firebaseapp.com',
  databaseURL: 'https://web-biblioteca-cp2tjk2-default-rtdb.firebaseio.com',
  projectId: 'web-biblioteca-cp2tjk2',
  storageBucket: 'web-biblioteca-cp2tjk2.appspot.com',
  messagingSenderId: '532696138107',
  appId: '1:532696138107:web:e54f090e91a9d9133cbdde',
  measurementId: 'G-C7XZ93RJNX'
};

const app = initializeApp(firebaseConfig);

const base_url = 'https://web-biblioteca-cp2tjk2-default-rtdb.firebaseio.com/';

const database = getDatabase(app, base_url);

export function getBookList() {
  const reference = ref(database);
  return get(child(reference, '/books/results')).then((snapshot) => {
    if (snapshot.exists()) {
      const result = snapshot.val();
      return(result);
    } else {
      return 'No data available';
    }
  }).catch(() => {
    return 'Error fetching, try again';
  });
}