import { AppDataSource } from "./typeorm/data-source";
import { User, Role } from "./typeorm/entities/User";
import { Quiz } from "./typeorm/entities/Quiz";
import bcrypt from "bcryptjs";

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const quizRepo = AppDataSource.getRepository(Quiz);

  const password = await bcrypt.hash("senha123", 8);
  const passwordStudent = await bcrypt.hash("senha123", 8);

  const teacher = userRepo.create({
    name: "Prof Exemplo",
    email: "teacher@example.com",
    password,
    role: Role.TEACHER,
  });

  const student = userRepo.create({
    name: "Aluno Teste",
    email: "aluno@teste.com",
    password: passwordStudent,
    role: Role.STUDENT,
  });

  await userRepo.save([teacher, student]);
  console.log("Usuários de teste criados!");
  const users = await userRepo.find();
  console.log("Usuários no banco:", users);

  const quiz = quizRepo.create({
    title: "Quiz de Matemática",
    description: "Básico",
    authorId: teacher.id,
    questions: [
      {
        text: "2+2 = ?",
        type: "MULTIPLE_CHOICE",
        options: [
          { text: "3", isCorrect: false },
          { text: "4", isCorrect: true },
        ],
      },
    ],
  });
  await quizRepo.save(quiz);

  console.log("Seed finalizado");
  await AppDataSource.destroy();
}

seed().catch(console.error);
