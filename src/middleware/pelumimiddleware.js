const jwt = require("jsonwebtoken");
const pelumi = require("../pelumiWeb");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    console.log(token);
    const decoded = jwt.verify(token, "thispelumipart");
    console.log(decoded);
    const pelumi2 = await pelumi.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(pelumi2);
    // if (!pelumi2) {
    //   throw new Error();
    // }
    // req.pelumi2 = pelumi2;
    // next();
  } catch (e) {
    res.status(401).send({ error: "Please autheticate" });
  }
  next();
};

module.exports = auth;
