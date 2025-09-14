import { Request, Response } from "express";
import { LoginUserUseCase } from "../../../use-cases/auth/LoginUserUseCase";

export class AuthController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUserUseCase.execute({ email, password });
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
