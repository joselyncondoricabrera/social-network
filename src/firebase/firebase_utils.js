// funciones para manipular firestore
import { doc, getDoc, setDoc, } from 'firebase/firestore';
import { db } from './firebase_config';

export const saveUserData = async ( uid, username, email ) => {
   const res = await setDoc(doc( db, 'users', uid ), {
        username,
        email
    });
  console.log(res);
}

export const getUserData = async (uid) => {
    const docRef = doc(db, 'users', uid);
    // const docSnap = await getDoc(docRef);

    try {
        return await getDoc(docRef);
        
    } catch (e) {
        return e;
    }

}