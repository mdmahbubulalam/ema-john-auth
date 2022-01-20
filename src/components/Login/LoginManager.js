import React from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  } from "firebase/auth";

export const initializeLoginFramework = () => {
    initializeApp(firebaseConfig);
    
}


export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const {displayName,email,photoURL} = result.user;
        const signedInUser = {
            isSingnedIn : true,
            name: displayName,
            email: email,
            photoURL: photoURL,
            success: true
        }

        return signedInUser;
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}

export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth).then(() => {
        const signedOutUser = {
            isSingnedIn : false,
            name: '',
            email: '',
            photoURL: '',
            success: false
        }

        return signedOutUser;
    }).catch((error) => {
        console.log(error);
    });
}

export const createUserWithEmailAndPass = (name,email,password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const newUserInfo = user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name)
        return newUserInfo;
    })
    .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.success = false;
        newUserInfo.error = errorCode;
        return newUserInfo;
    });
}

export const signInWithEmailAndPass = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const newUserInfo = user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.success = false;
        newUserInfo.error = errorCode;
        return newUserInfo;
    });
}

const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
    displayName: name
    }).then(() => {
        console.log('User name updated successfully');
    }).catch((error) => {
        console.log(error);
    });
}

