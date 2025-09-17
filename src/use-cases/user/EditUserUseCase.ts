import bcrypt from "bcryptjs";

import { Role } from "../../infra/typeorm/entities/User";

import { IUserRepository, UpdateUserDTO } from "../ports/IUserRepository";

import { emailRegex } from "../../shared/constants/regex";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../shared/errors/errors";

type Input = {
  id: number;
  data: UpdateUserDTO;
};

export class UpdateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({ id, data }: Input) {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    if (
      data.name === undefined &&
      data.email === undefined &&
      data.password === undefined &&
      data.role === undefined
    ) {
      throw new BadRequestError("Nenhum campo para atualizar");
    }

    if (data.name !== undefined) {
      if (!data.name || data.name.trim().length < 3) {
        throw new BadRequestError("Nome do usuário inválido");
      }
    }

    if (data.email !== undefined) {
      if (!emailRegex.test(data.email)) {
        throw new BadRequestError("Email inválido");
      }
      if (data.email !== user.email) {
        const emailTaken = await this.userRepo.existsByEmail(data.email);
        if (emailTaken) {
          throw new ConflictError("Email já cadastrado");
        }
      }
    }

    if (data.role !== undefined) {
      if (!Object.values(Role).includes(data.role)) {
        throw new BadRequestError("Perfil de usuário inválido");
      }
    }

    if (data.password !== undefined) {
      if (data.password.length < 6) {
        throw new BadRequestError("Senha deve ter ao menos 6 caracteres");
      }
      data.password = await bcrypt.hash(data.password, 8);
    }

    const updated = await this.userRepo.update(id, data);
    return updated;
  }
}
