import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "../infra/typeorm/data-source";

import { makeAuthRoutes } from "../routes/auth.routes";
import { makeRoutes as makeQuizRoutes } from "../routes/routes";

import { CreateQuizUseCase } from "../use-cases/createQuiz/CreateQuizUseCase";
import { TypeORMQuizRepository } from "../infra/repositories/TypeORMQuizRepository";

// Inicialização do Use Case
const quizRepository = new TypeORMQuizRepository();
const createQuizUseCase = new CreateQuizUseCase(quizRepository);

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  return res.status(500).json({ message: "Erro interno do servidor" });
}

dotenv.config();

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.use("/auth", makeAuthRoutes());
    app.use("/", makeQuizRoutes({ createQuizUseCase }));

    app.use(errorHandler);

    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados", error);
  });
