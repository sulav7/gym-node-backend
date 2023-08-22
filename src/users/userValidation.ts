import { z } from "zod";

const userSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First Name is required",
        invalid_type_error: "First Name must be a string",
      })
      .min(3, "First Name should be of at least 3 digit"),

    lastName: z
      .string({
        required_error: "Last Name is required",
        invalid_type_error: "Last Name must be a string",
      })
      .min(1, "Last name should be of at least 1 character"),

    phoneNumber: z.string({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({
        message: "Invalid email format",
      }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(5, "password must be of at least 5 character")
      .max(15, "password can't be of more than 15 character"),

    confirmPassword: z.string({
      required_error: "Confirm Password is required",
      invalid_type_error: "Confirm Password must be a string",
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    "Password and Confirm Password doesn't match"
  );

export default userSchema;
