import { TestStep } from "./step";

export function test(ticketId: `[${string}-${string}]`, ...steps: TestStep[]) {
  const bddSteps = steps
    .map((step, i) => `${i + 1}. ${step.bddStepDescription}`)
    .join(`\n`);
  it(`${ticketId}\n${bddSteps}`, function fn() {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      cy.log(`[STEP ${i + 1}] ${step.bddStepDescription}`);
      step.fn.call(this);
      cy.screenshot(`${ticketId}-step-${i + 1}`);
    }
  });
}
