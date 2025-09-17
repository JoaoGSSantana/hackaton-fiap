import { Role } from "../../infra/typeorm/entities/User";

import { IUserRepository } from "../ports/IUserRepository";

import { BadRequestError } from "../../shared/errors/errors";

export class ListUsersByRoleUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(role: Role) {
    if (!Object.values(Role).includes(role))
      throw new BadRequestError("Perfil de usuário inválido");

    const users = await this.userRepo.listByRole(role);

    return users;
  }
}
