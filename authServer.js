import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
dotenv.config();
app.get("/login", (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(
    { username: username },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json({ accessToken: accessToken });
});

app.listen(4000);
