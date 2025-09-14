import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Question } from "./Question";

@Entity({ name: "options" })
export class Option {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Question, (q) => q.options)
  @JoinColumn({ name: "questionId" })
  question!: Question;

  @Column()
  questionId!: number;

  @Column()
  text!: string;

  @Column({ default: false })
  isCorrect!: boolean;
}
