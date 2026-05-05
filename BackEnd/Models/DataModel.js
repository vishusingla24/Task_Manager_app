/*const mongoose = require("mongoose");
const dataDatabase = mongoose.createConnection(process.env.MONGO_URL);
const todoSchema = new mongoose.Schema(
  {
    todoId: { type: String },
    title: { type: String },
    status: { type: Boolean },
  },
  { _id: false }
);

const noteSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    noteText: { type: String },
    date: { type: String },
    time: { type: String },
  },
  { _id: false }
);

const currTaskSchema = new mongoose.Schema(
  {
    id: { type: String },
    task: {
      taskName: { type: String },
      description: { type: String },
      priority: { type: String },
      deadline: { type: String },
    },
    done: { type: Boolean },
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  todos: {
    type: [todoSchema],
  },
  notes: {
    type: [noteSchema],
  },
  tasks: {
    type: [currTaskSchema],
  },
});

module.exports = dataDatabase.model("UserData", schema);
*/
const mongoose = require("mongoose");
const dataDatabase = mongoose.createConnection(process.env.MONGO_URL);

const activitySchema = new mongoose.Schema({
  type: { type: String, enum: ['started', 'commented', 'bug'], required: true },
  content: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const todoSchema = new mongoose.Schema(
  {
    todoId: { type: String },
    title: { type: String },
    status: { type: Boolean },
  },
  { _id: false }
);

const noteSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    noteText: { type: String },
    date: { type: String },
    time: { type: String },
  },
  { _id: false }
);

const currTaskSchema = new mongoose.Schema(
  {
    id: { type: String },
    task: {
      taskName: { type: String },
      description: { type: String },
      priority: { type: String },
      deadline: { type: String },
    },
    done: { type: Boolean },
    activities: [activitySchema]
  },
  { _id: false }
);

const schema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  todos: {
    type: [todoSchema],
  },
  notes: {
    type: [noteSchema],
  },
  tasks: {
    type: [currTaskSchema],
  },
});

module.exports = dataDatabase.model("UserData", schema);