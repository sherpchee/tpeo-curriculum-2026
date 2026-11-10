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
    const authorization = req.get("Authorization");

    if(!authorization){
        return res.status(401);
    }

    const parts = authorization.split(" ");

    if(parts.length != 2 || parts[0] != "Bearer" || !parts[1]){
        return res.status(401); //wasn't the bearer status we expected
    }

    try {
        const decoded = jwt.verify(parts[1], ACCESS_TOKEN_SECRET, {algorithms: ["HS256"],});
        if(typeof decoded.username !== "string"){
            return res.status(401);
        }

        req.user = decoded.username;
        return next();

    } catch (error) {
        return res.status(401).jeson(error.message);
    }
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
  const key = pbkdf2.pbkdf2Sync(password, SALT, 1000, 64, "sha512");
  return key.toString("hex");
};

app.post("/register", async (req, res) => {
  // TODO: Validate username/password, reject duplicate users, hash the
  // password, store the user, and return a short-lived JWT.
  //create user, hash what their password, reject duplicates, then return the user 
  const {username, password} = req.body || {};

  if(typeof username !== "string" || typeof password !== "string" || password.length === 0){ //can add regex to ensure other password qualifications
    return res.status(400);
  }

  try {
    const userRef = db.collection("users").doc(username)
    const existingUser = await userRef.get(); //checks if it already exists

    if(existringUser.exists){
        return res.status(400); //already has this error
    }

    await userRef.set({
        username, 
        password: hashPassword(password)
    });

    const token = jwt.sign({username}, ACCESS_TOKEN_SECRET, {
        expiresIn: "30s"
    });

    return res.status(201).json({
        msg: "Created successfully",
        data: {username},
        token,
    })
  } catch (error) {
    return res.status(500).json({error: "registration failed"});
  }
});

app.post("/login", async (req, res) => {
  // TODO: Load the user, hash the submitted password, compare the hashes, and
  // return a JWT only when the credentials are correct.
  const {username, password} = req.body || {};

  if(typeof username !== "string" || typeof password !== "string" || password.length === 0){ //can add regex to ensure other password qualifications
    return res.status(400);
  }

  try {
    const snapshot = await db.collection("users").doc(username).get();

    if(!snapshot.exists || hashPassword(password) !== snapshot.data().password){
        return res.status(400); //already has this error
    }

    await userRef.set({
        username, 
        password: hashPassword(password)
    });

    const token = jwt.sign({username}, ACCESS_TOKEN_SECRET, {
        expiresIn: "30s"
    });

    return res.status(201).json({
        msg: "Created successfully",
        data: {username},
        token,
    })
  } catch (error) {
    return res.status(500).json({error: "registration failed"});
  }

});

app.get("/protected", authMiddleware, (req, res) => {
  res.send(`User ${req.user} was authenticated`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
