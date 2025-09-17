import { IUserRepository } from "../../use-cases/ports/IUserRepository";
import { UpdateUserUseCase } from "../../use-cases/user/EditUserUseCase";
import { CreateUserUseCase } from "../../use-cases/user/CreateUserUseCase";
import { GetUserByIdUseCase } from "../../use-cases/user/GetUserByIdUseCase";
import { ListAllUsersUseCase } from "../../use-cases/user/ListAllUsersUseCase";
import { ListUsersByRoleUseCase } from "../../use-cases/user/ListUsersByRoleUseCase";

export function makeUserDeps(repo: IUserRepository) {
  return {
    createUserUseCase: new CreateUserUseCase(repo),
    updateUserUseCase: new UpdateUserUseCase(repo),
    listUsersByRoleUseCase: new ListUsersByRoleUseCase(repo),
    listAllUsersUseCase: new ListAllUsersUseCase(repo),
    getUserByIdUseCase: new GetUserByIdUseCase(repo),
  };
}
