import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Quiz } from "./Quiz";
import { Submission } from "./Submission";

export enum Role {
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ type: "enum", enum: Role, default: Role.STUDENT })
  role!: Role;

  @OneToMany(() => Quiz, (quiz) => quiz.author)
  quizzes!: Quiz[];

  @OneToMany(() => Submission, (s) => s.student)
  submissions!: Submission[];

  @CreateDateColumn()
  createdAt!: Date;
}
