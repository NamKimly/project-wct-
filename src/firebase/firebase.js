// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCTKba5vwDKz1j8FhK9lEaIVawgJbw7ImM",
	authDomain: "storeproject-4ee09.firebaseapp.com",
	projectId: "storeproject-4ee09",
	storageBucket: "storeproject-4ee09.appspot.com",
	messagingSenderId: "321420445254",
	appId: "1:321420445254:web:8877c82e7067ddd839ec47",
	measurementId: "G-6DSX6G2B9M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
