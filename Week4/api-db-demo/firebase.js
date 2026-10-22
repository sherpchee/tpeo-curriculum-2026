// Provided setup: load credentials from the .env beside this file.
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const admin = require("firebase-admin");

const requiredVariables = [
  "FIREBASE_PROJECT_ID",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];
const missingVariables = requiredVariables.filter((name) => !process.env[name]?.trim());
if (missingVariables.length > 0) {
  throw new Error(
    `Missing ${missingVariables.join(", ")}. Copy .env.example to .env and fill in your Firebase service-account values.`
  );
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Accept escaped newlines copied from the downloaded service-account JSON.
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

module.exports = admin.firestore();
