import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User";
import { Quiz } from "./entities/Quiz";
import { Question } from "./entities/Question";
import { Option } from "./entities/Option";
import { Submission } from "./entities/Submission";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "quizedu",
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV !== "production",
  entities: [User, Quiz, Question, Option, Submission],
  migrations: [__dirname + "/../migrations/*.{ts,js}"],
});
