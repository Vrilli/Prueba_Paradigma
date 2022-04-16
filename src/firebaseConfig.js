import { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import Swal from "sweetalert2";



const firebaseConfig = {
  apiKey: "AIzaSyAXpTs_XO_wAHE1-8bfOcsiGFjeQzdBz1I",
  authDomain: "paradigma-4ca20.firebaseapp.com",
  projectId: "paradigma-4ca20",
  storageBucket: "paradigma-4ca20.appspot.com",
  messagingSenderId: "610159370796",
  appId: "1:610159370796:web:130ffeaa2e6c9aecb8a789"
};

const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider()
const db = getFirestore();
const auth = getAuth();


export {
  app,
  google,
  facebook,
  db,
  auth
}

export function register(email, password, username) {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      await updateProfile(auth.currentUser, { displayName: username })
      console.log(user);
    })
    .catch(e =>
      Swal.fire('El correo ya está registrado')
    )
}


export function login(email, password) {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      Swal.fire('Bienvenido')
    })
    .catch(e => Swal.fire('Revise sus campos'))
}

export function CerrarSesion() {
  return signOut(auth)
}


export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

