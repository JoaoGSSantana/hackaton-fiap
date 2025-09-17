import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";

import { makeUserDeps } from "./factories/makeUserDeps";

import { AppDataSource } from "../infra/typeorm/data-source";
import { TypeORMQuizRepository } from "../infra/repositories/TypeORMQuizRepository";
import { TypeORMUserRepository } from "../infra/repositories/TypeORMUserRepository";

import { makeAuthRoutes } from "../routes/auth.routes";
import { makeQuizRoutes } from "../routes/quiz.routes";
import { makeUserRoutes } from "../routes/user.routes";

import { errorHandler } from "../shared/middlewares/error-handler";

import { CreateQuizUseCase } from "../use-cases/createQuiz/CreateQuizUseCase";

dotenv.config();

const PORT = process.env.PORT || 3333;
const app = express();

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    // inicialização do repositório
    const quizRepository = new TypeORMQuizRepository();
    const userRepository = new TypeORMUserRepository();

    // Inicialização do Use Case
    const createQuizUseCase = new CreateQuizUseCase(quizRepository);

    app.use("/auth", makeAuthRoutes());
    app.use("/", makeQuizRoutes({ createQuizUseCase }));
    app.use("/user", makeUserRoutes(makeUserDeps(userRepository)));

    app.use(errorHandler);

    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados", error);
  });
