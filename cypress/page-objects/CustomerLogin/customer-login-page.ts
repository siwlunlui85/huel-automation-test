export class customerLoginPage {
  // Elements

  public static get emailInput() {
    return cy.get("#CustomerEmail");
  }

  public static get passwordInput() {
    return cy.get("#CustomerPassword");
  }

  public static get loginButton() {
    return cy.get("input[value='Sign In']");
  }

  // Helpers

  public static enterCustomerEmail(email: string) {
    this.emailInput.clear().type(email);
  }

  public static enterPassword(password: string) {
    this.passwordInput.clear().type(password);
  }

  public static clickLogin() {
    this.loginButton.click();
  }

  public static login(email: string, password: string) {
    this.enterCustomerEmail(email);
    this.enterPassword(password);
    this.clickLogin();
  }
}
