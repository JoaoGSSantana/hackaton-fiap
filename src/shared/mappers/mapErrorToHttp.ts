import { isHttpError } from "../errors/errors";

export function mapErrorToHttp(err: any) {
  if (isHttpError(err)) {
    return {
      status: err.statusCode,
      body: { message: err.message },
    };
  }

  return {
    status: 500,
    body: { message: "Erro interno do servidor" },
  };
}
