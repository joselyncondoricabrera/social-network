import{ auth } from '../firebase/firebase_config';
import { createContext, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut
} 
from 'firebase/auth';


export const  authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if(!context){
        console.log('error creando el auth context');
    }

    return context;
}

export function AuthProvider ({ children }) {
    
    const [activeUser, setActiveUser] = useState(null);

    const registerUserWithEmailPassword = async (email, password) => {
        
        return  await createUserWithEmailAndPassword(auth, email, password);
    }

    const loginWithEmailPassword = async (email,password) => { 
        return await signInWithEmailAndPassword( auth, email, password );
    }

    const loginWithGoogle = async() => {
        const responseGoogle = new GoogleAuthProvider();
        return await signInWithPopup(auth, responseGoogle);
    }

    const logout = async ()=> {
        const response = await signOut(auth);
    }

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setActiveUser(currentUser); // Establece el usuario actual
        });

        return () => unsubscribe(); // Limpia el listener al desmontar
    }, [])
    

    return (
    <authContext.Provider 
     value={{ 
        registerUserWithEmailPassword, 
        loginWithEmailPassword,
        loginWithGoogle,
        logout,
        activeUser
     }}>
        {children}
    </authContext.Provider>);
}
