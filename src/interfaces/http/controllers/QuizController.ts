import { Request, Response } from "express";
import { CreateQuizUseCase } from "../../../use-cases/createQuiz/CreateQuizUseCase";

export class QuizController {
  constructor(private createQuizUseCase: CreateQuizUseCase) {}

  async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      const authorId = req.user.id;
      const dto = { ...req.body, authorId };
      const quiz = await this.createQuizUseCase.execute(dto);
      return res.status(201).json(quiz);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const quiz = await this.createQuizUseCase["quizRepo"].findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz não encontrado" });
    return res.json(quiz);
  }

  async listAll(req: Request, res: Response) {
    try {
      const quizzes = await this.createQuizUseCase.listAll();
      res.json(quizzes);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
