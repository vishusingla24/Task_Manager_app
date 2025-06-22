/*const taskRoutes = require("express").Router();
const dataModel = require("../Models/DataModel");

taskRoutes.get("/getTask", async (req, res) => {
  const { _id } = req.user;
  const newTask = new dataModel({
    _id: _id,
  });
  let task = await dataModel.findById(_id);
  if (!task) task = await newTask.save();
  console.log(task.tasks);
  res.json(task.tasks);
});

taskRoutes.post("/postTask", async (req, res) => {
  const { _id } = req.user;
  const newTask = req.body;
  await dataModel
    .findByIdAndUpdate({ _id: _id }, { $push: { tasks: newTask } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Posted Successfully" });
});

taskRoutes.patch("/updateTask/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  await dataModel
    .findOneAndUpdate(
      { "tasks.id": id },
      {
        $set: {
          "tasks.$.done": done,
        },
      },
      { new: true }
    )
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Updated successfully" });
});

taskRoutes.delete("/deleteTask/:id", async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  await dataModel
    .findByIdAndUpdate(_id, { $pull: { tasks: { id: id } } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Deleted successfully" });
});

module.exports = taskRoutes;
*/
/*
const taskRoutes = require("express").Router();
const dataModel = require("../Models/DataModel");

taskRoutes.get("/getTask", async (req, res) => {
  const { _id } = req.user;
  const newTask = new dataModel({
    _id: _id,
  });
  let task = await dataModel.findById(_id);
  if (!task) task = await newTask.save();
  console.log(task.tasks);
  res.json(task.tasks);
});

taskRoutes.post("/postTask", async (req, res) => {
  const { _id } = req.user;
  const newTask = req.body;
  await dataModel
    .findByIdAndUpdate({ _id: _id }, { $push: { tasks: newTask } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Posted Successfully" });
});

taskRoutes.patch("/updateTask/:id", async (req, res) => {
  const { id } = req.params;
  const { taskName, description, priority, deadline, done } = req.body;

  try {
    const updatedTask = await dataModel.findOneAndUpdate(
      { "tasks.id": id },
      {
        $set: {
          "tasks.$.task.taskName": taskName,
          "tasks.$.task.description": description,
          "tasks.$.task.priority": priority,
          "tasks.$.task.deadline": deadline,
          "tasks.$.done": done,
        },
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ success: "Updated successfully", updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating task" });
  }
});

taskRoutes.delete("/deleteTask/:id", async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  await dataModel
    .findByIdAndUpdate(_id, { $pull: { tasks: { id: id } } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Deleted successfully" });
});

module.exports = taskRoutes;
*/
const taskRoutes = require("express").Router();
const dataModel = require("../Models/DataModel");

taskRoutes.get("/getTask", async (req, res) => {
  const { _id } = req.user;
  const newTask = new dataModel({
    _id: _id,
  });
  let task = await dataModel.findById(_id);
  if (!task) task = await newTask.save();
  console.log(task.tasks);
  res.json(task.tasks);
});

taskRoutes.post("/postTask", async (req, res) => {
  const { _id } = req.user;
  const newTask = req.body;
  await dataModel
    .findByIdAndUpdate({ _id: _id }, { $push: { tasks: newTask } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Posted Successfully" });
});

taskRoutes.patch("/updateTask/:id", async (req, res) => {
  const { id } = req.params;
  const { taskName, description, priority, deadline, done } = req.body;

  try {
    const updatedTask = await dataModel.findOneAndUpdate(
      { "tasks.id": id },
      {
        $set: {
          "tasks.$.task.taskName": taskName,
          "tasks.$.task.description": description,
          "tasks.$.task.priority": priority,
          "tasks.$.task.deadline": deadline,
          "tasks.$.done": done,
        },
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ success: "Updated successfully", updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating task" });
  }
});

taskRoutes.delete("/deleteTask/:id", async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  await dataModel
    .findByIdAndUpdate(_id, { $pull: { tasks: { id: id } } })
    .catch((err) => {
      console.log(err);
    });
  res.json({ success: "Deleted successfully" });
});

// Add activity to a task
taskRoutes.post("/:taskId/activity", async (req, res) => {
  const { _id } = req.user;
  const { taskId } = req.params;
  const { type, content } = req.body;

  try {
    const updatedTask = await dataModel.findOneAndUpdate(
      { _id: _id, "tasks.id": taskId },
      { $push: { "tasks.$.activities": { type, content } } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ success: "Activity added successfully", updatedTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error adding activity" });
  }
});

// Get activities for a task
taskRoutes.get("/:taskId/activities", async (req, res) => {
  const { _id } = req.user;
  const { taskId } = req.params;

  try {
    const task = await dataModel.findOne({ _id: _id, "tasks.id": taskId }, { "tasks.$": 1 });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task.tasks[0].activities);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching activities" });
  }
});

module.exports = taskRoutes;