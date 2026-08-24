import * as z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty("Full name is required!")
      .min(3, "Full name must be at least 3 characters!")
      .max(50, "Full name must be less than 50 characters!"),
    email: z
      .string()
      .nonempty("Email is required!")
      .email("Invalid email address!"),
    username: z
      .string()
      .nonempty("Username is required!")
      .regex(/^[a-z0-9_]{3,30}$/, {
        message:
          "Username must be 3–30 characters and can only contain lowercase letters, numbers, or underscores (_)",
      }),
    password: z
      .string()
      .nonempty("Password is required!")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!",
      ),
    rePassword: z.string().nonempty("Please confirm your password!"),
    dateOfBirth: z.coerce.date("Date of birth is required!").refine((value) => {
      const currentYear = new Date().getFullYear();
      const userDate = value.getFullYear();
      return currentYear - userDate >= 18;
    }, "You must be at least 18 years old!"),
    gender: z.enum(["male", "female"], "Please select your gender!"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match!",
  });
