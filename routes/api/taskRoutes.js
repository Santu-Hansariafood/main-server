const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/taskController");

router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.getTasks);
router.patch("/tasks/:id", taskController.updateTask);
router.patch("/tasks/:id/status", taskController.updateTaskStatus);
router.delete("/tasks/:id", taskController.deleteTask);
router.patch("/tasks/:id/reassign", taskController.reassignTask);


module.exports = router;
