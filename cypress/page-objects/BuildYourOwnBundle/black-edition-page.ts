import { values } from "cypress/types/lodash";

export class GetBYOBPage {
  // Elements

  public static get blackEdition() {
    return cy.get('[data-testid="ProductNavSlider"]').contains("Black Edition");
  }

  public static get continueButton() {
    return cy.get('[data-testid="SummaryBarContinueButton"]');
  }

  public static get huelButton() {
    return cy.get("huel-button").contains("Continue");
  }

  // Helpers

  public static clickBlackEdition() {
    this.blackEdition.click();
  }

  public static clickContinueButton() {
    this.continueButton.click();
  }

  public static clickHuelButton() {
    this.huelButton.click();
  }
}
