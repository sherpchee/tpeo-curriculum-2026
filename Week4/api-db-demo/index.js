// Student starter. Complete one numbered TODO at a time.
// See README.md for Firebase setup and the command to run this file.
const express = require("express");
const db = require("./firebase"); // Provided: loads .env and initializes Firestore.
const app = express();

// Provided from Week 3: JSON parsing and validation before the POST handler.
app.use(express.json());

const validateInput = (req, res, next) => {
  const { user, tweet } = req.body || {};
  if (
    typeof user !== "string" ||
    !user.trim() ||
    typeof tweet !== "string" ||
    !tweet.trim()
  ) {
    return res.status(400).json({
      error: "user and tweet must be non-empty strings.",
    });
  }
  next();
};

const validateTweetLength = (req, res, next) => {
  if (req.body.tweet.length > 100) {
    return res.status(400).json({
      error: "Tweet is too long (max 100 characters).",
    });
  }
  next();
};

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/tweets", async (req, res, next) => {
  // TODO 1: Await the tweets collection's get() operation.
  // Map snapshot.docs to objects with doc.data() and id: doc.id; send the array.
  // Put database operations in try/catch and call next(error) on failure.
  res.status(501).json({ error: "TODO 1: get all tweets from Firestore" });
});

app.get("/api/tweets/:user", async (req, res, next) => {
  // TODO 2: Query the tweets collection where user equals req.params.user.
  // Return 404 if the snapshot is empty; otherwise return all matching tweets.
  // Use the same snapshot mapping and try/catch pattern as TODO 1.
  res.status(501).json({ error: "TODO 2: query tweets by user" });
});

app.post("/api/tweets", validateInput, validateTweetLength, async (req, res, next) => {
  // TODO 3: Create { user: req.body.user.trim(), tweet: req.body.tweet }.
  // Await add() on the tweets collection. Return the new document ID and data
  // with status 201. Use try/catch and next(error) for database failures.
  res.status(501).json({ error: "TODO 3: create a Firestore document" });
});

app.delete("/api/tweets/:id", async (req, res, next) => {
  // TODO 4: Get the document reference for req.params.id, then its snapshot.
  // Return 404 if it does not exist. Otherwise await delete() on the reference
  // and return the deleted document's data and ID. Use try/catch and next(error).
  res.status(501).json({ error: "TODO 4: delete a Firestore document" });
});

// Provided: database failures forwarded with next(error) return JSON responses.
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body must be valid JSON." });
  }
  console.error("Database request failed:", error.message);
  res.status(500).json({ error: "Database request failed." });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
