import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Quiz } from "./Quiz";
import { Question } from "./Question";
import { Option } from "./Option";
import { User } from "./User";

@Entity({ name: "submissions" })
export class Submission {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.submissions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "quiz_id" })
  quiz!: Quiz;

  @ManyToOne(() => Question, { onDelete: "CASCADE" })
  @JoinColumn({ name: "question_id" })
  question!: Question;

  @ManyToOne(() => Option, { onDelete: "CASCADE" })
  @JoinColumn({ name: "option_id" })
  option!: Option;

  @ManyToOne(() => User, (user) => user.submissions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "student_id" })
  student!: User;

  @CreateDateColumn()
  submittedAt!: Date;
}
