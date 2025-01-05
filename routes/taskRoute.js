const express = require("express");
const taskController = require("../controllers/taskController");
const fetchUser = require("../middleware/authentication")
const router = express.Router();

router.post("/tasks",fetchUser, taskController.createTask);
router.put("/tasks/:id",fetchUser, taskController.updateTaskStatus);
router.get("/tasks", fetchUser, taskController.getAllTasks); 
router.get("/tasks/:id", fetchUser, taskController.fetchTaskById); 
router.get('/getUserTasks',fetchUser,taskController.getUserTasks)   
router.delete("/tasks/:id",fetchUser, taskController.deleteTask);

module.exports = router;