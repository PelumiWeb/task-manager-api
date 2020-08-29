const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

// router.get("/tested", (req, res) => {
//   res.send("Let us see if the motherfucker is working");
// });

router.post("/task", async (req, res) => {
  const task = new Task({
    description: "Fourth",
    completed: false,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/task/:id", async (req, res) => {
  // const updates = Object.keys({
  //   completed: true,
  // });
  // const allowedUpdates = ["description", "completed"];
  // const isValidOperation = updates.every((updates) => {
  //   return allowedUpdates.includes(updates);
  // });
  // if (!isValidOperation)
  //   return res.status(400).send({ error: "Invalid updates" });

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        completed: true,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    // updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      res.status(400).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/task", auth, async (req, res) => {
  // try {
  //   const task = await Task.find({});
  //   if (!task) {
  //     res.status(404).send();
  //   }
  //   res.status(201).send(task);
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path: "task",
        match,
        option: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: {
            createdAt: -1,
          },
        },
      })
      .execPopulate();
    res.status(200).send(req.user.task);
  } catch (e) {
    res.status(500).send("Something is wrong with the network");
  }
});

router.get("/task/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    // const taskId = await Task.findById(_id);
    const taskId = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!taskId) {
      res.status(404).send();
    }
    res.status(200).send(taskId);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
