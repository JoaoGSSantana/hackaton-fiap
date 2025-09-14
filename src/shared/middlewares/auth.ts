import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function authMiddleware(allowedRoles?: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header)
      return res.status(401).json({ message: "Token não fornecido" });
    const token = header.split(" ")[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      req.user = { id: Number(payload.sub), role: payload.role };
      if (allowedRoles && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Permissão negada" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };
}
