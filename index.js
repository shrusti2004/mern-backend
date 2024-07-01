const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB connection
mongoose
  .connect("mongodb+srv://shrustipalewar16:0qm6G9QNlfVG9jdK@cluster0.oa8va7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
// Schema and Model
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});
const Todo = mongoose.model("Todo", todoSchema);
// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });
  await newTodo.save();
  res.json(newTodo);
});
app.delete("/todos/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
