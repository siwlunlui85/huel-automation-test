# Huel E2E

The Huel E2E repository implements end to end tests for the Huel platform.

# Setup

1. Install the version of Node specified in `.nvmrc` (e.g. by using Node Version Manager).
2. Run `npm install`
3. Copy one of the example environment files to `cypress.env.json`
4. Please add your own password and email under `cypress.env.live.json` to make the login test work. (Need to update code at some point, as there are routing failures)

# Running Tests

To run tests via the Cypress GUI, run `npm start`. To run all enabled tests in headless mode, run `npm test`.

# Project Structure

All test files are located in the `cypress` folder. Test cases are defined in `cypress/e2e/<project>/<test>.cy.ts`, where `<project>` is the name of the project the test case belongs to (see the below section on [Projects](#projects)). Page objects are used to define helpers for specific pages (e.g. for getting specific elements), and are defined in `cypress/page-objects/<category>/<name>.ts`, where `<category>` can be any descriptive category (e.g. the project name if the page object is specific to a given project). Otherwise, Cypress conventions are followed.

# Configuration

Tests can be configured using the `cypress.env.json` file. Example files exist for different environments (e.g. `cypress.env.uat.json`) and these should be copied into `cypress.env.json` to run tests for different environments.

The configuration is validated at runtime. Tests will fail if `cypress.env.json` does not match the schema. The schema for `cypress.env.json` is defined in `cypress/config/schema.ts`. Any new configuration must be added both to the schema, and to the `cypress.env.*.json` configuration files.

# Writing Tests

## Test Structure

Each test file should be structured as follows. For more information about the helper functions used, see [Helpers](#helpers).

```ts
import { project } from "helpers/project";
import { test } from "helpers/test";
import { step } from "helpers/step";

project("ProjectName", (env) => { // <-- All tests in a file should be grouped in a `project` block
  describe("...", () => { // <-- Optionally, tests can be further grouped by a `describe` block
    test( // <-- Each test is specified using the `test` helper
      "[TICKET-ID]", // <-- The ticket ID is specified here (e.g. the Jira ID)
      step("Given ...", () => { // <-- Each step in a test is specified using the `step` helper
        //  /\ BDD descriptions are used to describe each test step.
        //     These should start with "Given", "When", "Then", or "And".
        // ...
      }),
      step("When ...", () => {
        // ...
      }),
      step("Then ...", () => {
        // ...
      }),
    );
  });
});
```

## Helpers

This repo provides various wrappers around the standard Mocha/Cypress test function. These provide useful functionality and enforce conventions.

### `project`

The `project` function wraps the global `describe` function and provides access to the project specific configuration and better integration with the global config (see [Projects](#projects) for details). It is used as follows:

```ts
import { project } from "helpers/project";

project("ProjectName", (env) => {
  // `env` is the project specific configuration
});
```

### `test` and `step`

The `test` and `step` functions wrap the `it` (or `specify`) function. They enforce consistent naming conventions for tests, and add better logging and automatic screenshot capturing. They are used as follows:

```ts
import { test } from "helpers/test";
import { step } from "helpers/step";

test(
  "[TICKET-ID]",
  step("Given ...", () => {
    // ...
  }),
  step("When ...", () => {
    // ...
  }),
  step("Then ...", () => {
    // ...
  }),
);
```

# Projects

Tests are grouped by project. A project may be a specific application, such as the build your own bundle and best seller bundle. Tests for a specific project are organized under the `cypress/e2e/<project>` directory.

Each test file contains a single `project` annotation:

```ts
import { project } from "helpers/project";

project("ExampleProject", (env) => {
  // Tests go here
});
```

The `project` annotation ensures the test will only run when the project is enabled in `cypress.env.json`. It also allows direct access to project specific configurations via the `env` parameter.

## Enabling / Disabling Projects

A project can be enabled or disabled by toggling the `skip` value in the project configuration in `cypress.env.json`.

```jsonc
{
  "projects": {
    "ExampleProject": {
      "skip": false, // All tests for this project will be skipped with this is `true` 
      // ...
    }
  }
}
```

## Updating a Project Configuration

To update a project configuration, first update the schema in `cypress/config/schema.ts`. The following updates should be made.

```ts
export const ENVIRONMENT = z.object({
  projects: z.object({
    // ...
    SomeNewProject: ProjectOptionsSchema({
      // <-- (1) Add or remove any properties
    }),
  } satisfies Environment),
});
```

Zod is used to define the schema in a type safe way. For more information about how to specify the schema, see the [Zod documentation](https://github.com/colinhacks/zod#basic-usage).

Next, update the `cypress.env.*.json` configuration files to match the new schema. To ensure configuration files are valid, you can run `npm run validate:configs`. Note that by default, this will not validate the current `cypress.env.json`. To validate the current configuration, run `npm run validate:configs -- cypress.env.json`.

## Adding New Projects

A new project must first be added to the configuration schema in `cypress/config/schema.ts`. The following updates should be made.

```ts
export type Project =
  | "Project1"
  | "Project2"
  | "SomeNewProject"; // <-- (1) Add the new project to the Project type

// --snip--

export const ENVIRONMENT = z.object({
  projects: z.object({
    // ...
    SomeNewProject: ProjectOptionsSchema({ // <-- (2) Add the new project to the ENVIRONMENT schema
      // <-- (3) Add any project specific configuration here
    }),
  } satisfies Environment),
});
```

Next, update the `cypress.env.*.json` configuration files to match the new schema. To ensure configuration files are valid, you can run `npm run validate:configs`. Note that by default, this will not validate the current `cypress.env.json`. To validate the current configuration, run `npm run validate:configs -- cypress.env.json`.

Finally, create a folder for the project under `cypress/e2e/<project-name>`. You can then add a new test cases for the project at `cypress/e2e/<project-name>/<test-case>.cy.ts`. Test files should be structured as follows.

```ts
import { project } from "helpers/project";

project("SomeNewProject", (env) => {
  describe("Group of Tests", () => {
    it("test case", () => {
      // Test implementation
    });
  });
});
```

It is important to make use of the `project` helper, as this will ensure the test only runs when that project is enabled. It also allows direct access to the project specific configuration via the `env` parameter.
