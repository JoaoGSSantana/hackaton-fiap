import { Router } from "express";
import { QuizController } from "../interfaces/http/controllers/QuizController";
import { authMiddleware } from "../shared/middlewares/auth";

export function makeQuizRoutes(deps: { createQuizUseCase: any }) {
  const router = Router();
  const controller = new QuizController(deps.createQuizUseCase);

  router.post("/quizzes", authMiddleware(["TEACHER"]), (req, res) =>
    controller.create(req, res)
  );
  router.get(
    "/quizzes/:id",
    authMiddleware(["TEACHER", "STUDENT", "ADMIN"]),
    (req, res) => controller.getById(req, res)
  );

  router.get(
    "/quizzes",
    authMiddleware(["TEACHER", "STUDENT", "ADMIN"]),
    (req, res) => controller.listAll(req, res)
  );

  return router;
}
