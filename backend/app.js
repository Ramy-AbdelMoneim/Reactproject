const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");
const bodyparser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
const jwt = require("jsonwebtoken");
const key = "asdadas";
const cookie = require("cookie-parser");
app.use(cookie());

async function connectDB() {
  await client.connect();
  console.log("Connected to DB");
  const mydb = client.db("Reactproject");
  app.db = mydb;
  app.listen("8080", () => console.log("server started"));
}
app.post("/login", async (req, res) => {
  let user = await app.db
    .collection("users")
    .findOne({ username: req.body.username });
  if (user) {
    if (user.password == req.body.password) {
      const token = jwt.sign(
        { username: user.username, userId: user._id },
        key
      );
      let resp = [token, user.username, user._id];
      res.send(resp);
    } else {
      res.send("wrong");
    }
  } else {
    console.log("wrong user");
    res.send("wrong");
  }
});
app.post("/register", async (req, res) => {
  await app.db.collection("users").insertOne(req.body);
  let user = await app.db
    .collection("users")
    .findOne({ username: req.body.username });
  const token = jwt.sign(
    { username: req.body.username, userId: user._id },
    key
  );
  let resp = [token, user.username, user._id];
  res.send(resp);
});

//retrieve posts from db
app.get("/", async (req, res) => {
  const posts = await app.db.collection("posts").find({}).toArray();
  setTimeout(() => {
    res.send(posts);
  }, 2000);
});

// add post to db
app.post("/add", async (req, res) => {
  const resp = await app.db.collection("posts").insertOne(req.body);
  const data = await app.db.collection("posts").findOne(req.body);
  res.send(data);
});

//delete post from db
app.post("/delete/:id", async (req, res) => {
  id = req.url.split("/");
  const post = await app.db
    .collection("posts")
    .findOne({ _id: new ObjectId(`${id[2]}`) });
  await app.db.collection("posts").deleteOne({ _id: new ObjectId(`${id[2]}`) });
  res.send(post);
});

//modify a post
app.post("/modify/:id", async (req, res) => {
  id = req.url.split("/");
  console.log(id[2]);
  result = await app.db.collection("posts").updateOne(
    { _id: new ObjectId(`${id[2]}`) },
    {
      $set: {
        title: req.body.title,
        body: req.body.body,
        imgurl: req.body.imgurl,
      },
    }
  );
  post = await app.db
    .collection("posts")
    .findOne({ _id: new ObjectId(`${id[2]}`) });

  console.log(post);
  res.send(post);
});

app.post("/user", (req, res) => {
  let token = req.body.token;
  let decoded = jwt.verify(token, key);
  res.send(decoded);
});
connectDB();
