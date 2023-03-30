// require("dotenv").config();
import {} from "dotenv/config";
// const express = require("express");
import express from "express";
const app = express();
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// const axios = require("axios");
// const fetch = require("node-fetch");
import fetch from "node-fetch";

// var cors = require("cors");
import cors from "cors";

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
  console.log("gateway /login", username, password);
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // fetch("http://localhost:3002/login", {
  return fetch("http://authservice:4000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        console.log("result", result.accessToken);
        res.json(result);
      },
      (error) => {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    );
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
