var admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://formbuilder-52e7b.firebaseio.com'
});


export var firestore = new admin.firestore.Firestore();
