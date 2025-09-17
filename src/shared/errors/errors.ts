export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string, code?: string) {
    super(400, message, code);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Não autenticado", code?: string) {
    super(401, message, code);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Acesso negado", code?: string) {
    super(403, message, code);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, code?: string) {
    super(404, message, code);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string, code?: string) {
    super(409, message, code);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Erro interno do servidor", code?: string) {
    super(500, message, code);
  }
}

export function isHttpError(err: unknown): err is HttpError {
  return (
    !!err && typeof err === "object" && "statusCode" in err && "message" in err
  );
}
