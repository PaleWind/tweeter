import {} from "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { authGate } from "./gates/authGate.js";

const app = express();
app.use(express.json());
app.use(cors());

const posts = [
  {
    id: "1",
    username: "aoi",
    title: "Post 1",
  },
  {
    id: "2",
    username: "aoi",
    title: "Post 2",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json(authGate.login(username, password));
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  res.json(authGate.register(username, password));
});

app.get("/feed", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.username));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    console.log(user);
    req.user = user;
    next();
  });
}

app.listen(4000);
