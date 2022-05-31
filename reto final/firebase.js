// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAse8jWCfALeDKzR5swtNRUfjX3TuiETyM",
    authDomain: "fast-crud-da0ec.firebaseapp.com",
    projectId: "fast-crud-da0ec",
    storageBucket: "fast-crud-da0ec.appspot.com",
    messagingSenderId: "765760816475",
    appId: "1:765760816475:web:96ae2293c109e577ec867e"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = (idstude, nombre,apellido) =>
  addDoc(collection(db, "Estudiante"), { idstude,nombre,apellido });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "Estudiante"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "Estudiante", id));

export const getTask = (id) => getDoc(doc(db, "Estudiante", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "Estudiante", id), newFields);

export const getTasks = () => getDocs(collection(db, "Estudiante"));


/**  segunda parte-------------------------------------------------------------------------------*/
export const saveTask2 = (idclass, title,description) =>
  addDoc(collection(db, "Clases"), { idclass,title,description });

export const onGetTasks2 = (callback2) =>
  onSnapshot(collection(db, "Clases"), callback2);

/**
 *
 * @param {string} id Task ID
 */
export const eliminar = (id) => deleteDoc(doc(db, "Clases", id));

export const getTask2 = (id) => getDoc(doc(db, "Clases", id));

export const actualizar = (id, newFields2) =>
  updateDoc(doc(db, "Clases", id), newFields2);

export const obtener = () => getDocs(collection(db, "Clases"));

/**  tercera  parte-------------------------------------------------------------------------------*/
export const saveTask3 = (idmatricula,idclass,idstude) =>
  addDoc(collection(db, "Matricula"), { idmatricula,idclass,idstude });

export const onGetTasks3 = (callback2) =>
  onSnapshot(collection(db, "Matricula"), callback2);

/**
 *
 * @param {string} id Task ID
 */
export const eliminar3 = (id) => deleteDoc(doc(db, "Matricula", id));

export const getTask3 = (id) => getDoc(doc(db, "Matricula", id));

export const actualizar3 = (id, newFields2) =>
  updateDoc(doc(db, "Matricula", id), newFields2);

export const obtener3 = () => getDocs(collection(db, "Matricula"));