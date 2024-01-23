import { env } from "config/env";
import { Project } from "config/schema";

type ProjectEnv<TProject extends Project> = (typeof env.projects)[TProject];

export function project<TProject extends Project>(
  projectName: TProject,
  callback: (this: Mocha.Suite, env: ProjectEnv<TProject>) => void,
) {
  function fn(this: Mocha.Suite) {
    callback.call(this, env.projects[projectName]);
  }
  if (env.projects[projectName].skip) {
    describe.skip(projectName, fn);
  } else {
    describe(projectName, fn);
  }
}
