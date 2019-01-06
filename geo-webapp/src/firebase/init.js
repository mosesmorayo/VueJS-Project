import firebase, { firestore, database } from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBKKOl7xYcvJZ_qwGfaimpkLYoqW9sznNY",
    authDomain: "moses-geo-webapp.firebaseapp.com",
    databaseURL: "https://moses-geo-webapp.firebaseio.com",
    projectId: "moses-geo-webapp",
    storageBucket: "moses-geo-webapp.appspot.com",
    messagingSenderId: "913398315101"
  };
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

//   export firestore database
export default firebaseApp.firestore()