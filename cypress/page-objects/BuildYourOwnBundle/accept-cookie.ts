export class GetBYOBPage {
  // Elements

  public static get acceptAllCookiesButton() {
    return cy.get("#onetrust-accept-btn-handler");
  }

  public static get cookieModal() {
    return cy.get("#onetrust-banner-sdk");
  }

  // Helpers

  public static acceptCookies() {
    this.acceptAllCookiesButton.click();
  }
}
