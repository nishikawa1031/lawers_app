import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAROE-k8Ajj6ctR84UbXjIOgBLXo342rHw",
    authDomain: "lawanswerapp.firebaseapp.com",
    databaseURL: "https://lawanswerapp.firebaseio.com",
    projectId: "lawanswerapp",
    storageBucket: "lawanswerapp.appspot.com",
    messagingSenderId: "271271268538",
    appId: "1:271271268538:web:8027fa888c6bb141237283",
  })
}

export default firebase
