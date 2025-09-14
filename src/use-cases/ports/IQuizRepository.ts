export type CreateQuizDTO = {
  authorId: number;
  title: string;
  description?: string;
  questions: {
    text: string;
    type: "MULTIPLE_CHOICE" | "OPEN";
    options?: { text: string; isCorrect?: boolean }[];
  }[];
};

export interface IQuizRepository {
  create(dto: CreateQuizDTO): Promise<any>;
  findById(id: number): Promise<any | null>;
  listByAuthor(authorId: number): Promise<any[]>;
  listAll(): Promise<any>;
}
