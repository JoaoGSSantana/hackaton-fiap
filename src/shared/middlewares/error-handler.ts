import { NextFunction, Request, Response } from "express";
import { mapErrorToHttp } from "../mappers/mapErrorToHttp";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { status, body } = mapErrorToHttp(err);

  res.status(status).json(body);
}
