import { ZodError } from "zod";

const validateError = (err: ZodError) => {
  const error: string[] = [];
  err.issues.map((e) => {
    error.push(e.message);
  });

  return error;
};

const error = (message: string, responseCode: number) => {
  const status = [400, 404, 422, 403];

  const code = status.includes(responseCode) ? responseCode : 500;
  const errorMessage = message
    ? message
    : "There is something wrong please contact BE Developer";

  return {
    message: errorMessage,
    code: code,
  };
};

const success = (message: string, result: any, code: number) => {
  return {
    message: message,
    result: result,
    code: code,
  };
};
export { validateError, error, success };
