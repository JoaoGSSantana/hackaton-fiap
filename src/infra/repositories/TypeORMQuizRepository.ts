import { AppDataSource } from "../typeorm/data-source";
import { Quiz } from "../typeorm/entities/Quiz";
import {
  IQuizRepository,
  CreateQuizDTO,
} from "../../use-cases/ports/IQuizRepository";

export class TypeORMQuizRepository implements IQuizRepository {
  private repo = AppDataSource.getRepository(Quiz);

  async create(dto: CreateQuizDTO) {
    const quiz = this.repo.create({
      title: dto.title,
      description: dto.description,
      authorId: dto.authorId,
      questions: dto.questions.map((q) => ({
        text: q.text,
        type: q.type,
        options:
          q.options?.map((o) => ({ text: o.text, isCorrect: !!o.isCorrect })) ??
          [],
      })),
    });

    return await this.repo.save(quiz);
  }

  async findById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ["questions", "questions.options", "author"],
    });
  }

  async listByAuthor(authorId: number) {
    return await this.repo.find({
      where: { authorId },
      relations: ["questions", "questions.options"],
    });
  }

  async listAll() {
    return await this.repo.find({
      relations: ["questions", "questions.options", "author"],
    });
  }
}
