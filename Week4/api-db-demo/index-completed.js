// Completed answer key. Follow the matching steps in index.template.js and README.md.
const express = require("express");
const db = require("./firebase"); // Loads this folder's .env and connects the Admin SDK.
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

// STEP 1: Read the collection and turn document snapshots into JSON objects.
app.get("/api/tweets", async (req, res, next) => {
  try {
    const snapshot = await db.collection("tweets").get();
    const tweets = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    res.json(tweets);
  } catch (error) {
    next(error);
  }
});

// STEP 2: Ask Firestore for all tweets belonging to the route's username.
app.get("/api/tweets/:user", async (req, res, next) => {
  try {
    const snapshot = await db
      .collection("tweets")
      .where("user", "==", req.params.user)
      .get();
    if (snapshot.empty) {
      return res.status(404).json({ error: "No tweets found for this user" });
    }

    const tweets = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    res.json(tweets);
  } catch (error) {
    next(error);
  }
});

// STEP 3: Create one document per tweet; Firestore generates its string ID.
app.post("/api/tweets", validateInput, validateTweetLength, async (req, res, next) => {
  try {
    const newTweet = {
      user: req.body.user.trim(),
      tweet: req.body.tweet,
    };
    const tweetRef = await db.collection("tweets").add(newTweet);
    res.status(201).json({ id: tweetRef.id, ...newTweet });
  } catch (error) {
    next(error);
  }
});

// STEP 4: Look up a document by the string ID in the URL, then delete it.
app.delete("/api/tweets/:id", async (req, res, next) => {
  try {
    const tweetRef = db.collection("tweets").doc(req.params.id);
    const snapshot = await tweetRef.get();
    if (!snapshot.exists) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    await tweetRef.delete();
    res.json({ ...snapshot.data(), id: snapshot.id });
  } catch (error) {
    next(error);
  }
});

// Provided: Express 4 async handlers forward database failures here with next(error).
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body must be valid JSON." });
  }
  console.error("Database request failed:", error.message);
  res.status(500).json({ error: "Database request failed." });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
