const admin = require("firebase-admin");

const serviceAccount = require("./cred.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin.firestore();
