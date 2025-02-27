const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = new express.Router();
// router.get("/test", (req, res) => {
//   res.send("From a new file");

// });

router.post("/users", async (req, res) => {
  const user = new User({
    name: "Pelumi1",
    age: 10,
    email: "Pelumilumi229@gmail.com",
    password: "lumiluminate1",
  });

  try {
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).send({ user, token: token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", auth, async (req, res) => {
  let UserLogin = new User({
    email: "Pelumilumi225@gmail.com",
    password: "lumiluminate1",
  });
  try {
    const user = await User.findByCredentials(
      UserLogin.email,
      UserLogin.password
    );
    const token = user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("users/logout", async (req, res) => {
  try {
    req.user.tokens = request.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  // try {
  //   const user = await User.find({});
  //   res.status(200).send(user);
  // } catch (e) {
  //   res.status(500).send(e);
  // }
});

router.get("/users/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
const updates = Object.keys({
  name: "lumi",
});
console.log(updates);

router.patch("/users/me ", async (req, res) => {
  const userBody = {
    name: "oluwanimi",
    age: 21,
    email: "pelumigoundipe905@gmail.com",
    password: "opeyemi1998",
  };
  const updates = Object.keys({
    name: "Lumi",
  });
  console.log(updates);
  const allowedUpdates = ["name", "email", "password", "age"];
  // const isValidOperation =  allowedUpdates.includes(updates);
  const isValidOperation = updates.every((updates) => {
    return allowedUpdates.includes(updates);
  });

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });

  try {
    const user = await User.find(req.params.id);
    updates.forEach((updates) => {
      user[updates] = userBody[updates];
    });
    await user.save();
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
      cb(new Error("The file is not acceptable"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).pre().toBuffer();
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
router.delete(
  "/users/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.send({ error: error.message });
  }
);

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {}
});

module.exports = router;
