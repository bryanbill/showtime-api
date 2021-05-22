const firebase = require("firebase").default;

const fbConfig = {
  apiKey: "AIzaSyA4dKcJMQlFMzpDUyxBAlCS1DCdPX9lUOg",
  authDomain: "show-tyme.firebaseapp.com",
  projectId: "show-tyme",
  storageBucket: "show-tyme.appspot.com",
  messagingSenderId: "694999929257",
  appId: "1:694999929257:web:f8015e282d81b1eeb034b8",
  measurementId: "G-LZFF0LREXR",
};
firebase.initializeApp(fbConfig);
// utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage;
const images = firebase.firestore.FieldValue.arrayUnion();

// export utils/refsy
module.exports = {
  db: db,
  auth: auth,
  storage: storage,
};
