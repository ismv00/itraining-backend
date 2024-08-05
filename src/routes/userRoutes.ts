import express from "express";
import {
  index,
  login,
  register,
  deleteUser,
} from "../controllers/userController";
import {
  createWorkout,
  indexWorkouts,
  deleteWorkout,
} from "../controllers/workoutController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/index", index);
router.delete("/deleteUser/:userId", deleteUser);

router.post("/:userId", createWorkout);
router.get("/:userId", indexWorkouts);
router.delete("/:userId/:workoutId", deleteWorkout);

export default router;
