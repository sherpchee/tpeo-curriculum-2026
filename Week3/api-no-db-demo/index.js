// Student starter. Complete one numbered TODO at a time.
// See README.md for setup and the command to run this file.
const express = require("express");
require("dotenv").config();

const app = express();

// Provided: turn incoming JSON into req.body before the routes run.
app.use(express.json());

// Provided: our fake database and a counter for new tweet IDs.
const tweets = [
  { id: 1, user: "Zara", tweet: "Hello" },
  { id: 2, user: "Emerald", tweet: "World" },
];
let nextTweetId = 3;

// TODO 5: Require user and tweet to be non-empty strings.
// Return a 400 JSON error for invalid input; call next() for valid input.
const validateInput = (req, res, next) => {
  next(); // Replace this body during step 5.
};

// TODO 6: Reject tweets longer than 100 characters with a 400 JSON error.
// validateInput runs first, so req.body.tweet will be a non-empty string.
const validateTweetLength = (req, res, next) => {
  next(); // Replace this body during step 6.
};

app.get("/", (req, res) => {
  // TODO 1: Send the text "Hello World".
  res.status(501).json({ error: "TODO 1: root route" });
});

app.get("/api/tweets", (req, res) => {
  // TODO 2: Send the tweets array as JSON.
  res.status(501).json({ error: "TODO 2: get all tweets" });
});

app.get("/api/tweets/:user", (req, res) => {
  // TODO 3: Use req.params.user and find() to get the first matching tweet.
  // Return a 404 JSON error if there is no match; otherwise return the tweet.
  res.status(501).json({ error: "TODO 3: get a user's tweet" });
});

app.post("/api/tweets", validateInput, validateTweetLength, (req, res) => {
  // TODO 4: Build a tweet with nextTweetId++, req.body.user.trim(),
  // and req.body.tweet. Push it into tweets, then return it with status 201.
  // Start with valid input; steps 5-6 add validation in the middleware above.
  res.status(501).json({ error: "TODO 4: create a tweet" });
});

app.delete("/api/tweets", (req, res) => {
  // TODO 7: Require an integer req.body.id (400 otherwise).
  // Find its array index with findIndex(). Return 404 if it is missing.
  // Remove it with splice() and return the removed tweet as JSON.
  res.status(501).json({ error: "TODO 7: delete a tweet" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
