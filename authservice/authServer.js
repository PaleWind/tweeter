import {} from "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcryptjs";
import { authRepo } from "./authRepo.js";

const app = express();
app.use(cors());
app.use(express.json());

let users = [
  {
    username: "aoi",
    password: "pass",
  },
];
let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", async (req, res) => {
  try {
    console.log("auth login");
    // Authenticate User
    const user = await authRepo.getUser(req.body.username);
    if (user == null) {
      return res.status(400).send("Cannot find user");
    }
    if (bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("Not Allowed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

app.post("/register", async (req, res) => {
  try {
    console.log("authserver/register");
    const { username, password } = req.body;
    const existingUser = await authRepo.getUser(req.body.username);
    if (existingUser) {
      return res.status(409).json({ message: "Username is already taken" });
    }
    await authRepo.registerUser(username, password);
    const newUser = await authRepo.getUser(username);
    const accessToken = generateAccessToken(newUser);
    const refreshToken = jwt.sign(newUser, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
}

app.listen(4000);
