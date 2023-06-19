import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
dotenv.config();
const posts = [
  {
    username: "Anshuman",
    title: "Post 1",
  },
  {
    username: "Kundu",
    title: "Post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  console.log("step 4");
  res.json(posts.filter((post) => post.username === req.user.username));
});

function authenticateToken(req, res, next) {
  console.log("Step 1 entered");
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token fetched", token);
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    console.log("step 2");
    req.user = user;
    console.log("step 3 ", user);
    next();
  });
}
app.listen(3000);
