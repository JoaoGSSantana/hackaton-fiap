import { Role, User } from "../typeorm/entities/User";
import { AppDataSource } from "../typeorm/data-source";

import {
  CreateUserDTO,
  IUserRepository,
  UpdateUserDTO,
} from "../../use-cases/ports/IUserRepository";

export class TypeORMUserRepository implements IUserRepository<User> {
  private repo;

  constructor() {
    if (!AppDataSource.isInitialized) {
      throw new Error("DataSource não inicializado");
    }

    this.repo = AppDataSource.getRepository(User);
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const user = this.repo.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });

    return await this.repo.save(user);
  }

  async update(id: number, dto: UpdateUserDTO): Promise<User | null> {
    const toUpdate = await this.repo.preload({ id, ...dto });

    if (!toUpdate) return null;
    return await this.repo.save(toUpdate);
  }

  findById(id: number): Promise<User | null> {
    return this.repo.findOne({
      where: { id },
      select: ["id", "name", "email", "role", "createdAt"],
    });
  }

  existsByEmail(email: string): Promise<boolean> {
    return this.repo.exists({ where: { email } });
  }

  listByRole(role: Role): Promise<User[]> {
    return this.repo.find({
      where: { role },
      select: ["id", "name", "email", "role", "createdAt"],
    });
  }

  listAll(): Promise<User[]> {
    return this.repo.find({
      select: ["id", "name", "email", "role", "createdAt"],
    });
  }
}
