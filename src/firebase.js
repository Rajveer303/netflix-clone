
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDVMO3eoRcwi3mV9P1OYEd3zxCgt-FhScs",
  authDomain: "netflix-clone-df0a7.firebaseapp.com",
  projectId: "netflix-clone-df0a7",
  storageBucket: "netflix-clone-df0a7.firebasestorage.app",
  messagingSenderId: "354662637801",
  appId: "1:354662637801:web:94eeb2b0e164c7c6af9078",
  measurementId: "G-25SE2B54S5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name, 
            authProvider: "local",
            email,
        })
    }
    catch(error)
    {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async(email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error)
    {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout= ()=>{
    signOut(auth);
}

export{auth, db, login, signup, logout};