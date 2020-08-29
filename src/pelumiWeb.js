const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    validate(age) {
      if (age !== 21) {
        throw new Error("The age is not correct");
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthomaticToken = async function () {
  const pelumi = this;
  const token = jwt.sign({ _id: pelumi._id.toString() }, "thispelumipart");

  pelumi.tokens = pelumi.tokens.concat({ token });
  console.log(token);
  await pelumi.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const pelumi = await pelumiWeb.findOne({ email });

  if (!pelumi) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, pelumi.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return pelumi;
};

//  Hash the plain password before saving
userSchema.pre("save", async function (next) {
  const pelumi = this;
  if (pelumi.isModified("password")) {
    pelumi.password = await bcrypt.hash(pelumi.password, 8);
  }

  next();
});

const pelumiWeb = mongoose.model("PelumiUser", userSchema);

module.exports = pelumiWeb;
