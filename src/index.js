const express = require("express");
require("./db/mongoose");
const userRouter = require("./Routers/user");
const taskRouter = require("./Routers/task");
const bycrypt = require("bcryptjs");
const PelumiTest = require("../pelumiTest");

const app = express();
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });
// app.use((req, res, next) => {
//   res.status(503).send("SIte is currently down check back sooon");
// });
// app.use((req, res, next) => {
//   if (req.method) {
//     res.status(503).send("Site is currently down. Check back soon!");
//   }
// });
const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a word document"));
    }
    cb(undefined, true);
  },
});

app.post(
  "/upload",
  upload.single("upload"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
app.use(userRouter);
app.use(taskRouter);
app.use(PelumiTest);

const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
// const jwt = require("jsonwebtoken");
// const pelumiTest = require("../pelumiTest");

// const myFunction = async () => {
//   const token = jwt.sign({ _id: "abcd23" }, "thisismynewcourse", {
//     expiresIn: "7 days",
//   });

//   const data = jwt.verify(token, "thisismynewcourse");
// };
// const Task = async () => {
//   const task = await Task.findById("");
// };
// myFunction();
