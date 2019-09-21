import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyD226bVuM2ILpTwmvrZ1oomz9Zu27uoneA",
    authDomain: "crwn-db-d238f.firebaseapp.com",
    databaseURL: "https://crwn-db-d238f.firebaseio.com",
    projectId: "crwn-db-d238f",
    storageBucket: "",
    messagingSenderId: "147095996771",
    appId: "1:147095996771:web:1e706c8728de4abe6a2b56"
  }
  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return
    const UserRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await UserRef.get()
      if (!snapShot.exists){
        const { displayName,email} = userAuth
        const createdAt = new Date()
        try{
            await UserRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
            })
          } catch(err){console.log('error creating user', err.message)}
      }
    return UserRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase