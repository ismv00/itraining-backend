import { Request, Response } from "express";
import { secret } from "../auth/config";
import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma";

export const createExercises = async (req: Request, res: Response) => {
  const { workoutId } = req.params;
  const { name, sets, reps, startWeight, endWeight, image } = req.body;

  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token não informado");
  }
  try {
    const decodedToken = jwt.verify(token, secret) as { id: number };

    if (!decodedToken || !decodedToken.id) {
      return res.status(401).send("Token inválido");
    }

    const userTokenId = decodedToken.id;

    const workout = await prisma.workout.findUnique({
      where: { id: parseInt(workoutId) },
      include: { user: true },
    });

    if (!workout || workout.userId !== userTokenId) {
      return res
        .status(404)
        .send("Treino não encontrado ou não pertence a esse usuário.");
    }

    const newExercise = await prisma.exercise.create({
      data: {
        name,
        sets,
        reps,
        startWeight,
        endWeight,
        image,
        workoutId: parseInt(workoutId),
        userId: userTokenId,
      },
    });

    return res.status(201).json(newExercise);
  } catch (error) {
    console.error("Erro ao criar exercício", error);
    return res.status(500).send("Erro interno no servidor");
  }
};
