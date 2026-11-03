# Authentication Demo Starter

This is the unfinished version of the Week 7 authentication demo. Use it as a starting point for implementing:

- User registration with a hashed password
- User login with password verification
- JWT creation and expiration
- Bearer-token authentication middleware
- Protected routes

## Setup

1. Copy your Firebase Admin service-account file into this folder as `cred.json`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```text
   ACCESS_TOKEN_SECRET=replace-this-with-a-long-random-value
   PASSWORD_SALT=replace-this-with-a-random-salt
   PORT=3000
   ```

4. Start the server:

   ```bash
   node index.js
   ```

## Firebase setup

Use the same Firebase project as the previous demo. The app expects:

- A `tweets` collection with a `tweets` document containing a `tweets` array
- A `users` collection where each document is keyed by username
- Each user document should eventually contain `username` and a hashed `password`

## Suggested implementation order

1. Finish `hashPassword`.
2. Implement `authMiddleware`.
3. Implement `/register`.
4. Implement `/login`.
5. Test the `/protected` route with a token in Postman.
6. Confirm that an expired token is rejected.
7. Test the tweet routes after authentication is working.

Do not commit `cred.json` or `.env`.
