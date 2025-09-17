import { IUserRepository } from "../ports/IUserRepository";

import { NotFoundError } from "../../shared/errors/errors";

export class GetUserByIdUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(id: number) {
    const user = await this.userRepo.findById(id);

    if (!user) throw new NotFoundError("Usuário não encontrado");

    return user;
  }
}
