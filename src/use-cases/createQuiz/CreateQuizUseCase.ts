import { IQuizRepository, CreateQuizDTO } from "../ports/IQuizRepository";

export class CreateQuizUseCase {
  constructor(private quizRepo: IQuizRepository) {}

  async execute(dto: CreateQuizDTO) {
    if (!dto.title || dto.title.trim().length < 3) {
      throw new Error("Título do quiz inválido");
    }
    if (!dto.questions || dto.questions.length === 0) {
      throw new Error("Quiz precisa ter pelo menos 1 questão");
    }
    for (const q of dto.questions) {
      if (q.type === "MULTIPLE_CHOICE") {
        if (!q.options || q.options.length < 2) {
          throw new Error(
            "Questões de múltipla escolha precisam ter ao menos 2 opções"
          );
        }
      }
    }

    const created = await this.quizRepo.create(dto);
    return created;
  }

  async listAll() {
    return await this.quizRepo.listAll();
  }
}
