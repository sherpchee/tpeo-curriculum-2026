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
  const {user, tweet} = req.body || {};
  if (typeof user !== "string" || !user.trim() || typeof tweet !== "string" || !tweet.trim()) {
    return res.status(400).jon({ error: "user and tweet must be non-empty strings"});
  }
  next();
};

// TODO 6: Reject tweets longer than 100 characters with a 400 JSON error.
// validateInput runs first, so req.body.tweet will be a non-empty string.
const validateTweetLength = (req, res, next) => {
  if (req.body.tweet.length > 100) {
    return res.status(400).json({ error: "Tweet is too long"});
  }
  next();
};

app.get("/", (req, res) => {
  // TODO 1: Send the text "Hello World".
  // res.status(501).json({ error: "TODO 1: root route" });
  res.send("Hello World");
});

app.get("/api/tweets", (req, res) => {
  // TODO 2: Send the tweets array as JSON.
  res.json(tweets);
});

app.get("/api/tweets/:user", (req, res) => {
  // TODO 3: Use req.params.user and find() to get the first matching tweet.
  // Return a 404 JSON error if there is no match; otherwise return the tweet.
  const target = tweets.find((tweet) => tweet.user === req.params.user);
  if (!target) {
    return res.status(404).json({error: "Tweet not found for user"});
  }
  res.json(target);
});

app.post("/api/tweet", validateInput, validateTweetLength, (req, res) => {
  // TODO 4: Build a tweet with nextTweetId++, req.body.user.trim(),
  // and req.body.tweet. Push it into tweets, then return it with status 201.
  // Start with valid input; steps 5-6 add validation in the middleware above.
  const tweet = {
    id: nextTweetId++,
    user: req.body.user.trim(),
    tweet: req.body.tweet,
  };
  tweets.push(tweet);
  res.status(201).json(tweet);
});

app.delete("/api/tweets", (req, res) => {
  // TODO 7: Require an integer req.body.id (400 otherwise).
  // Find its array index with findIndex(). Return 404 if it is missing.
  // Remove it with splice() and return the removed tweet as JSON.
  const {id} = req.body || {};
  if (!Number.isInteger(id)) {
    return res.status(400).json({error: "id must be integer"});
  }

  const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);
  if (tweetIndex === -1) {
    return res.status(404).json({error: "tweet not found"});
  }

  const [removed] = tweets.splice(tweetIndex, 1);
  res.json(removed);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
