const express = require("express");

const jwt = require("jsonwebtoken");
const auth = require("./src/middleware/pelumimiddleware");
const pelumiWeb = require("./src/pelumiWeb");
const router = new express.Router();

const pelumiG = new pelumiWeb({
  name: "Oluwapelumi",
  age: 21,
  email: "pelumiyemimymymiiyiyiy@gmail.com",
  password: "mesalototme995",
});

router.post("/pelumi", async (req, res) => {
  const pelumi = new pelumiWeb({
    name: "Oluwapelumi",
    age: 21,
    email: "pelumiyemimymymiiyiyiy@gmail.com",
    password: "mesalototme995",
  });
  try {
    await pelumi.save();
    const token = await pelumi.generateAuthomaticToken();
    res.status(201).send({ pelumi, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/pelumi/login", async (req, res) => {
  const pelumi3 = pelumiG;
  try {
    const pelumi = await pelumiWeb.findByCredentials(
      pelumi3.email,
      pelumi3.password
    );
    const token = await pelumiG.generateAuthomaticToken();
    console.log(pelumi);
    res.send({ pelumi, token });
  } catch (e) {
    res.status(400).send("Something went wrong");
  }
});

router.patch("/pelumi/:id", async (req, res) => {
  const pelumi = {
    password: "PelumiOgundipe998",
  };
  const updates = Object.keys(pelumi);
  const allowedUpdates = ["name", "age", "email", "password"];

  const isValidOperation = updates.every((updates) =>
    allowedUpdates.includes(updates)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const pelumiUpdate = {
      name: "oluwamiero",
      password: "PelumiOgundipe9986",
    };
    // const pelumi = await pelumiWeb.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     name: "Yemi",
    //     password: "PelumiOgundipe998",
    //   },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    const pelumi = await pelumiWeb.findById(req.params.id);
    updates.forEach((update) => (pelumi[update] = pelumiUpdate[updates]));
    await pelumi.save();
    if (!pelumi) {
      res.status(404).send();
    }
    res.status(200).send(pelumi);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/pelumi/:id", async (req, res) => {
  const _id = req.params.id;
  const token = await pelumiG.generateAuthomaticToken();
  try {
    const pelumi = await pelumiWeb.findById(_id);
    if (!pelumi) {
      console.log(pelumi);
      res.status(400).send("pelumi not found");
    }
    res.send({ pelumi, token });
  } catch (e) {
    res.status(400).send();
  }
});
router.get("/pelumi/me", auth, async (req, res) => {
  res.send(req.pelumi);
});

const myFunction = async () => {
  // const password = "PelumiOgundipe998";
  // const hashedPassword = await bcrypt.hash(password, 8);
  // console.log(password, hashedPassword);

  // const isMatch = await bcrypt.compare(password, hashedPassword);
  // console.log(isMatch);
  // if (isMatch) {
  // }
  const token = jwt.sign({ _id: "pelumi111" }, "thispelumipart", {
    expiresIn: "7 days",
  });

  const data = jwt.verify(token, "thispelumipart");
};

module.exports = router;
// const Random = Math.random() * 100;
// const round = Math.round(Random);
// console.log(Random.toFixed(2));
// console.log(round);
