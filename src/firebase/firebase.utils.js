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

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase