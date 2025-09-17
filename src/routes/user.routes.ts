import { Router } from "express";
import { UserController } from "../interfaces/http/controllers/UserController";
import { authMiddleware } from "../shared/middlewares/auth";

type UserDeps = {
  createUserUseCase: any;
  updateUserUseCase: any;
  listUsersByRoleUseCase: any;
  listAllUsersUseCase: any;
  getUserByIdUseCase: any;
};

export function makeUserRoutes(deps: UserDeps) {
  const router = Router();

  const controller = new UserController(
    deps.createUserUseCase,
    deps.updateUserUseCase,
    deps.listUsersByRoleUseCase,
    deps.listAllUsersUseCase,
    deps.getUserByIdUseCase
  );

  router.post("/", authMiddleware(["ADMIN"]), (req, res, next) =>
    controller.create(req, res, next)
  );

  router.patch(
    "/:id",
    authMiddleware(["ADMIN", "TEACHER", "STUDENT"]),
    (req, res, next) => controller.update(req, res, next)
  );

  router.get(
    "/:id",
    authMiddleware(["ADMIN", "TEACHER", "STUDENT"]),
    (req, res, next) => controller.getById(req, res, next)
  );

  router.get(
    "/",
    authMiddleware(["ADMIN", "TEACHER", "STUDENT"]),
    (req, res, next) => controller.list(req, res, next)
  );

  return router;
}
