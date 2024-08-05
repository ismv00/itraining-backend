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
import { createExercises } from "../controllers/exercisesController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/index", index);
router.delete("/deleteUser/:userId", deleteUser);

router.post("/:userId", createWorkout);
router.get("/:userId", indexWorkouts);
router.delete("/:userId/:workoutId", deleteWorkout);

router.post("/:workoutId/exercises", createExercises);

export default router;
