import { User } from "../../infra/typeorm/entities/User";
import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

interface LoginDTO {
  email: string;
  password: string;
}

export class LoginUserUseCase {
  constructor(private userRepo: Repository<User>) {}

  async execute({ email, password }: LoginDTO) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: ["id", "name", "role", "password"],
    });
    if (!user) throw new Error("Usuário não encontrado");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Senha inválida");

    const token = jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      access_token: token,
      user: { id: user.id, name: user.name, role: user.role },
    };
  }
}
