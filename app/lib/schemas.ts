import * as z from 'zod';

// Signup schema
export const signUpSchema = z.object({
  name: z.string()
    .min(2, "Name should have at least 2 characters.")
    .max(50, "Name should not exceed 50 characters.")
    .refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), 'Name should contain only alphabets.'),
  email: z.string().email("Email must be valid."),
  password: z.string()
    .min(8, "Password should have at least 8 characters."),
  confirmPassword: z.string()
}).superRefine((data, ctx) => {
  // Vérification si les mots de passe sont identiques
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      path: ['confirmPassword'],
      message: "Passwords do not match.",
      code: z.ZodIssueCode.custom,
    });
  }
  // Vérification si la longueur du mot de passe est suffisante
  if (data.password.length < 8) {
    ctx.addIssue({
      path: ['password'],
      message: "Password should have at least 8 characters.",
      code: z.ZodIssueCode.custom,
    });
  }
  if (data.confirmPassword.length < 8) {
    ctx.addIssue({
      path: ['confirmPassword'],
      message: "Password should have at least 8 characters.",
      code: z.ZodIssueCode.custom,
    });
  }
}); 