const mongoose = require("mongoose");
const validator = require("validator");
const { Timestamp } = require("mongodb");

const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

// const taskModel = new Task({
//   description: " Creating an app ",
// });

// taskModel.save()

// taskModel
//   .save()
//   .then((task) => {
//     console.log(task);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

module.exports = Task;
