import * as z from "zod";
import { readFileSync } from "fs";
import { ENVIRONMENT } from "../cypress/config/schema";
import { globSync } from "fast-glob";
import { fromZodError } from "zod-validation-error";
import * as chalk from "chalk";

function getFiles() {
  let args = process.argv.slice(2);
  if (args.length === 0) {
    return globSync("cypress.env.*.json");
  }
  if (args[0] === "--lint-staged") {
    args = args.slice(1);
    if (args.some((arg) => arg.endsWith("cypress/config/schema.ts"))) {
      return globSync("cypress.env.*.json");
    }
  }
  return args;
}

function validate(file: string) {
  let isValid = true;
  console.error(chalk.underline(`Validating ${file}...`));
  const config = JSON.parse(readFileSync(file, "utf8"));
  try {
    ENVIRONMENT.parse(config);
  } catch (error) {
    const err = fromZodError(error as z.ZodError);
    console.error(
      chalk.red(`Schema validation errors found in ${file}: ${err.message}`),
    );
    isValid = false;
  }
  console.error();
  return isValid;
}

const files = getFiles();
const allValid = files.every(validate);

if (!allValid) {
  console.error(
    chalk.bold.red(
      "One or more invalid configurations found. See above errors.",
    ),
  );
  process.exit(1);
} else [console.error(chalk.bold.green("All configurations are valid!"))];
