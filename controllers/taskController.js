// Path to JSON file
const DATA_FILE = "./data/productData.json";
const fs = require("fs");

// Helper function to read tasks from file
const readTasks = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Helper function to write tasks to file
const writeTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};



// Create a new task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const status = req.body.status || "pending";
  const userId = req.user.id; // Getting userId from authenticated request
  //console.log(userId,"userid")
  
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const tasks = readTasks();
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    status,
    userId, // Assigning userId to the new task
  };
  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
};

// Fetch all tasks for the authenticated user
exports.getAllTasks = (req, res) => {
  const userId = req.user.id; // Getting userId from authenticated request
  const tasks = readTasks();
  res.json(tasks);
};


exports.getUserTasks = (req, res) => {
  const userId = req.user.id;  // Assuming the user is authenticated and user info is added to req.user
  const tasks = readTasks();

  // Filter tasks based on the userId
  const userTasks = tasks.filter((task) => task.userId === userId);

  if (userTasks.length === 0) {
    return res.status(404).json({ message: "No tasks found for this user" });
  }

  res.json(userTasks);
};

// Fetch a task by ID for the authenticated user
exports.fetchTaskById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userId = req.user.id; // Getting userId from authenticated request
  const tasks = readTasks();
  
  const task = tasks.find((t) => t.id === id && t.userId === userId); // Filter by userId

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

// Update a task's status for the authenticated user
exports.updateTaskStatus = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;
  const userId = req.user.id; // Getting userId from authenticated request

  if (!["pending", "in-progress", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id && t.userId === userId); // Filter by userId

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex].status = status;
  writeTasks(tasks);

  res.json({ message: "Task updated successfully", task: tasks[taskIndex] });
};

// Delete a task by ID for the authenticated user
exports.deleteTask = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userId = req.user.id; // Getting userId from authenticated request
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id && t.userId === userId); // Filter by userId

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  writeTasks(tasks);

  res.json({ message: "Task deleted successfully", task: deletedTask });
};
