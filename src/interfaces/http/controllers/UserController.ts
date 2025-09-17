import { NextFunction, Request, Response } from "express";

import { Role } from "../../../infra/typeorm/entities/User";

import { UpdateUserUseCase } from "../../../use-cases/user/EditUserUseCase";
import { CreateUserUseCase } from "../../../use-cases/user/CreateUserUseCase";
import { GetUserByIdUseCase } from "../../../use-cases/user/GetUserByIdUseCase";
import { ListAllUsersUseCase } from "../../../use-cases/user/ListAllUsersUseCase";
import { ListUsersByRoleUseCase } from "../../../use-cases/user/ListUsersByRoleUseCase";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly listByRoleUseCase: ListUsersByRoleUseCase,
    private readonly listAllUseCase: ListAllUsersUseCase,
    private readonly getByIdUseCase: GetUserByIdUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      if (req.user.role !== Role.ADMIN) {
        return res.status(403).json({ message: "Permissão negada" });
      }

      const user = await this.createUserUseCase.execute(req.body);

      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado" });
      }

      if (
        req.user.role !== Role.ADMIN &&
        req.user.id !== Number(req.params.id)
      ) {
        return res.status(403).json({ message: "Permissão negada" });
      }

      const id = Number(req.params.id);

      const updated = await this.updateUserUseCase.execute({
        id,
        data: req.body,
      });

      return res.status(202).json(updated);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      const user = await this.getByIdUseCase.execute(id);

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const role = req.query.role as Role | undefined;

      if (role) {
        const users = await this.listByRoleUseCase.execute(role);

        return res.json(users);
      }

      const users = await this.listAllUseCase.execute();

      return res.json(users);
    } catch (err) {
      next(err);
    }
  }
}
