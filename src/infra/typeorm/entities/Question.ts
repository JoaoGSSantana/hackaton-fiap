import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Quiz } from "./Quiz";
import { Option } from "./Option";

@Entity({ name: "questions" })
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: "quizId" })
  quiz!: Quiz;

  @Column()
  quizId!: number;

  @Column()
  text!: string;

  @Column()
  type!: "MULTIPLE_CHOICE" | "OPEN";

  @OneToMany(() => Option, (opt) => opt.question, { cascade: true })
  options!: Option[];
}
