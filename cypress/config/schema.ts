import { z } from "zod";

// Types

export type Project = "Customer_Login" | "BYOB_Page";
type Environment = Record<Project, ReturnType<typeof ProjectOptionsSchema>>;

// Helpers

export function ProjectOptionsSchema<T extends z.ZodRawShape>(shape: T) {
  return z.strictObject({
    ...shape,
    skip: z.boolean(),
  });
}

// Schema

const LoginCredentialsSchema = z.strictObject({
  email: z.string(),
  password: z.string(),
});

export const ENVIRONMENT = z.strictObject({
  projects: z.object({
    Customer_Login: ProjectOptionsSchema({
      ADMIN_LOGIN_URL: z.string().url(),
      ADMIN_USER: LoginCredentialsSchema,
    }),
    BYOB_Page: ProjectOptionsSchema({
      GET_BYOB_URL: z.string().url(),
    }),
  } satisfies Environment),
});
