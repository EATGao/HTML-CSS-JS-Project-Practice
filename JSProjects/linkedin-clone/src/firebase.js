
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "your api key",
    authDomain: "your app domain",
    projectId: "your project id",
    storageBucket: "your storage bucket",
    messagingSenderId: "your msging sender id",
    appId: "your app id",
    measurementId: "your measurement id"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)


export { db, auth};