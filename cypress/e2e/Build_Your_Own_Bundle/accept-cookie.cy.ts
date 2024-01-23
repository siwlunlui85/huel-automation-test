import { project } from "helpers/project";
import { step } from "helpers/step";
import { test } from "helpers/test";
import { GetBYOBPage } from "page-objects/BuildYourOwnBundle/accept-cookie";

project("BYOB_Page", (env) => {
  describe("Accept cookies on the webpage", () => {
    test(
      "[Jira-22]",
      step("Given I am on the build your own bundle page", () => {
        cy.visit(env.GET_BYOB_URL);
      }),
      step("When I click the accept cookie button", () => {
        GetBYOBPage.acceptCookies();
      }),
      step("Then the cookie banner should be hidden", () => {
        GetBYOBPage.cookieModal.should("not.be.visible");
      })
    );
  });
});
