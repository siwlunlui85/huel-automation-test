import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export function validateSchema<T extends z.ZodTypeAny>(
  schema: T,
  value: unknown,
): ReturnType<T["parse"]> {
  try {
    return schema.parse(value);
  } catch (error) {
    const err = fromZodError(error as z.ZodError);
    err.message = `Invalid environment variables!\n${err.message}\nCheck your cypress.env.json file.`;
    throw err;
  }
}
