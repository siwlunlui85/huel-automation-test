import { validateSchema } from "./helpers";
import { ENVIRONMENT } from "./schema";

export const env = validateSchema(ENVIRONMENT, Cypress.env());
