import * as z from "zod";

export const changePasswordSchema = z.object({
  password: z.string().nonempty("Current password is required!"),
  newPassword: z
    .string()
    .nonempty("New password is required!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character!",
    ),
});
