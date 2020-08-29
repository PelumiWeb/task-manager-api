const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

app.use(express.json());

// const posts = [
//   {
//     username: "Kyle",
//     title: "Post 1",
//   },
//   {
//     username: "Pelumi",
//     title: "Post 2",
//   },
// ];

// app.get("/posts", (req, res) => {
//   res.send(posts);
// });

// app.post("/login", (req, res) => {
//   // Authentication User

//   const username = req.body.username;
//   const user = { name: username };
//   jwt.sign(user, "thisishowstardo");
// });
const users = [];
console.log(users);
app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    res.status(201).send(user);
    users.push(user);
  } catch (e) {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (!user) {
    return res.status(404).send("Cannot find the user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Sucess");
    }
    res.send("Could not login");
  } catch (e) {}
});

app.listen(3030, () => {
  console.log("port starting in host 3030");
});
