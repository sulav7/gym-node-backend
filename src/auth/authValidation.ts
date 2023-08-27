import { z } from "zod";

const validateAuthentication = z.object({
  email: z.string({
    required_error: "email is required",
    invalid_type_error: "email must be string",
  }),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be string",
  }),
});

export { validateAuthentication };
