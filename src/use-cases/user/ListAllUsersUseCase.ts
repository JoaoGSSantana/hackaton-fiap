import { IUserRepository } from "../ports/IUserRepository";

export class ListAllUsersUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute() {
    const users = await this.userRepo.listAll();

    return users;
  }
}
