const { randomInt } = require("crypto");
const express = require("express");
const jwt = require("jsonwebtoken");
const pbkdf2 = require("pbkdf2");
const db = require("./firebase");

require("dotenv").config();

const app = express();
app.use(express.json());

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const SALT = process.env.PASSWORD_SALT;

if (!ACCESS_TOKEN_SECRET || !SALT) {
  throw new Error("ACCESS_TOKEN_SECRET and PASSWORD_SALT must be set in .env");
}

const validateTweetLength = (req, res, next) => {
  const tweet = req.body.tweet;

  if (typeof tweet === "string" && tweet.length <= 100) {
    return next();
  }

  return res
    .status(400)
    .json({ error: "Tweet is required and must be 100 characters or fewer." });
};

const validateInput = (req, res, next) => {
  if (!req.body.tweet || !req.user) {
    return res.status(400).json({ error: "Incomplete input" });
  }

  return next();
};

// TODO: Read the Bearer token from the Authorization header, verify it with
// jsonwebtoken, and assign the authenticated username to req.user.
function authMiddleware(req, res, next) {
  return res.status(501).json({ error: "authMiddleware is not implemented" });
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/tweets", authMiddleware, async (req, res) => {
  const doc = await db.collection("tweets").doc("tweets").get();
  res.send(doc.data().tweets);
});

app.get("/api/tweets/:user", authMiddleware, async (req, res) => {
  const doc = await db.collection("tweets").doc("tweets").get();
  const tweets = doc.data().tweets;
  const target = tweets.find((tweet) => tweet.user === req.params.user);

  if (!target) {
    return res.status(404).send("Tweet not found");
  }

  return res.send(target);
});

app.post(
  "/api/tweets",
  authMiddleware,
  validateInput,
  validateTweetLength,
  async (req, res) => {
    const tweet = {
      id: randomInt(1000),
      user: req.user,
      tweet: req.body.tweet,
    };
    const tweetsRef = db.collection("tweets").doc("tweets");
    const snapshot = await tweetsRef.get();
    const currentTweets = snapshot.data().tweets;

    currentTweets.push(tweet);
    await tweetsRef.update({ tweets: currentTweets });
    return res.send(tweet);
  },
);

app.delete("/api/tweets", authMiddleware, async (req, res) => {
  const tweetsRef = db.collection("tweets").doc("tweets");
  const snapshot = await tweetsRef.get();
  const currentTweets = snapshot.data().tweets;
  const tweetIndex = currentTweets.findIndex(
    (tweet) => tweet.id === req.body.id,
  );

  if (tweetIndex === -1) {
    return res.status(404).send("Tweet not found");
  }

  const [removed] = currentTweets.splice(tweetIndex, 1);
  await tweetsRef.update({ tweets: currentTweets });
  return res.json(removed);
});

// TODO: Hash passwords with PBKDF2 before storing or comparing them.
const hashPassword = (password) => {
  return password;
};

app.post("/register", async (req, res) => {
  // TODO: Validate username/password, reject duplicate users, hash the
  // password, store the user, and return a short-lived JWT.
  return res.status(501).json({ error: "Registration is not implemented" });
});

app.post("/login", async (req, res) => {
  // TODO: Load the user, hash the submitted password, compare the hashes, and
  // return a JWT only when the credentials are correct.
  return res.status(501).json({ error: "Login is not implemented" });
});

app.get("/protected", authMiddleware, (req, res) => {
  res.send(`User ${req.user} was authenticated`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
