import { Role } from "../../infra/typeorm/entities/User";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type UpdateUserDTO = Partial<Omit<CreateUserDTO, "password">> & {
  password?: string;
};

export interface IUserRepository<T = any> {
  create(dto: CreateUserDTO): Promise<T>;
  update(id: number, dto: UpdateUserDTO): Promise<T | null>;
  findById(id: number): Promise<T | null>;
  existsByEmail(email: string): Promise<boolean>;
  listByRole(role: Role): Promise<T[]>;
  listAll(): Promise<T[]>;
}
