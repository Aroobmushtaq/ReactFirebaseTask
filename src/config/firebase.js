import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDGsFjH93Z525eIhnkpbwzVCMPH7Jdp1gs",
  authDomain: "new-project-88dbe.firebaseapp.com",
  projectId: "new-project-88dbe",
  storageBucket: "new-project-88dbe.appspot.com",
  messagingSenderId: "651262056182",
  appId: "1:651262056182:web:21a4055fd5fa892058fed7",
  measurementId: "G-13Y95PX34T", 
  databaseURL: "https://new-project-88dbe-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider= new GoogleAuthProvider()
export const db=getFirestore(app)
export const storage=getStorage(app);