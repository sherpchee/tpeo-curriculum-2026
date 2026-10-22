# Express and Firestore API demo

Extend the Week 3 tweet API with Firebase Cloud Firestore. JSON parsing, validation, and Firebase initialization are provided; complete the four database TODOs in `index.js` during the walkthrough.

## Setup

1. Create or select a project in the [Firebase console](https://console.firebase.google.com/). Open Firestore and create the default database in production mode.
2. Open **Project settings -> Service accounts -> Generate New Private Key** to download the service-account JSON. [Firebase setup reference](https://firebase.google.com/docs/admin/setup)
3. If `.env` does not exist, run `Copy-Item .env.example .env`. Fill in `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` using the JSON's `project_id`, `client_email`, and `private_key` values. Wrap the key in double quotes and keep its `\n` escapes, as shown in `.env.example`. Keep `.env` and the downloaded key local.
4. From this folder, run:

   ```sh
   npm ci
   npm start
   ```

The server uses `http://localhost:3001` by default; change `PORT` in `.env` if needed. Firebase values are required before startup. The root route works immediately; unfinished database routes return `501` TODO responses.

Use Postman to send requests. For POST, select **Body -> raw -> JSON**. DELETE takes the Firestore document ID in the URL: `/api/tweets/:id`. Stop with Ctrl+C and restart after editing code or `.env`.
