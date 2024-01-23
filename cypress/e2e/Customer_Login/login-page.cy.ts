import { project } from "helpers/project";
import { step } from "helpers/step";
import { test } from "helpers/test";
import { customerLoginPage } from "page-objects/CustomerLogin/customer-login-page";

project("Customer_Login", (env) => {
  describe("Customer login page", () => {
    test(
      "[Jira-01]",
      step("Given I am on customer login page", () => {
        cy.visit(env.ADMIN_LOGIN_URL);
      }),
      step("When I enter the correct email and password", () => {
        customerLoginPage.emailInput.type(env.ADMIN_USER.email);
        customerLoginPage.passwordInput.type(env.ADMIN_USER.password);
      }),
      step("And I click the sign in button", () => {
        customerLoginPage.loginButton.click();
      }),
      step("Then I should be logged in", () => {
        cy.url().should("eq", "https://uk.huel.com/challenge");
      })
    );
  });
});
