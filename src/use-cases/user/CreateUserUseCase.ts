import bcrypt from "bcryptjs";

import { Role } from "../../infra/typeorm/entities/User";

import { CreateUserDTO, IUserRepository } from "../ports/IUserRepository";

import { emailRegex } from "../../shared/constants/regex";
import { BadRequestError, ConflictError } from "../../shared/errors/errors";

export class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(dto: CreateUserDTO) {
    const existingUser = await this.userRepo.existsByEmail(dto.email);

    if (existingUser) {
      throw new ConflictError("Email já cadastrado");
    }

    if (!dto.name || dto.name.trim().length < 3) {
      throw new BadRequestError("Nome do usuário inválido");
    }

    if (!emailRegex.test(dto.email)) {
      throw new BadRequestError("Email inválido");
    }

    if (dto.password.length < 6) {
      throw new BadRequestError("Senha deve ter ao menos 6 caracteres");
    }

    if (!Object.values(Role).includes(dto.role)) {
      throw new BadRequestError("Perfil de usuário inválido");
    }

    dto.password = await bcrypt.hash(dto.password, 8);

    const created = await this.userRepo.create(dto);

    return created;
  }
}
