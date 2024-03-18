describe("Example of generating a token for use in OTP tests", () => {
  let secret: string | number | string[] | undefined; // in this example, secret is taken from the app page,
  // but normally you will pass it in from a fixture
  // or an environment variable

  beforeEach(() => {
    cy.visit("https://otplib.yeojz.dev"); // we use this page as a sample app

    // Get the secret
    cy.contains("Demo Secret")
      .parent()
      .parent()
      .find("input")
      .invoke("val")
      .should("not.eq", "Loading...") // simpler than waitUntil()
      .then((value) => (secret = value));
  });

  it("tests the token entry", () => {
    cy.task("generateToken", secret).then((token) => {
      cy.contains("Verify Token").click();

      cy.contains("Please input a token").parent().find("input").type(token);

      cy.contains("The token is valid in this current window").should(
        "be.visible"
      );
    });
  });
});
