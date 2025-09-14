import { LoginUserUseCase } from "../use-cases/auth/LoginUserUseCase";
import { AuthController } from "../interfaces/http/controllers/AuthController";
import { AppDataSource } from "../infra/typeorm/data-source";
import { User } from "../infra/typeorm/entities/User";
import { Router } from "express";

export function makeAuthRoutes() {
  const router = Router();
  const loginUseCase = new LoginUserUseCase(AppDataSource.getRepository(User));
  const authController = new AuthController(loginUseCase);

  router.post("/login", (req, res) => authController.login(req, res));

  return router;
}
