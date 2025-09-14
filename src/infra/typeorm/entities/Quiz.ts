import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Question } from "./Question";
import { Submission } from "./Submission";

@Entity({ name: "quizzes" })
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  published!: boolean;

  @ManyToOne(() => User, (user) => user.quizzes)
  @JoinColumn({ name: "authorId" })
  author!: User;

  @Column()
  authorId!: number;

  @OneToMany(() => Question, (q) => q.quiz, { cascade: true })
  questions!: Question[];

  @OneToMany(() => Submission, (s) => s.quiz)
  submissions!: Submission[];

  @CreateDateColumn()
  createdAt!: Date;
}
