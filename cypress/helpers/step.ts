export type TestFn = (this: Mocha.Context) => void;
export type BddStepDescription =
  | `Given ${string}`
  | `When ${string}`
  | `Then ${string}`
  | `And ${string}`;
export type TestStep = {
  bddStepDescription: BddStepDescription;
  fn: TestFn;
};

export function step(bddStepDescription: BddStepDescription, fn: TestFn) {
  return {
    bddStepDescription,
    fn,
  };
}
