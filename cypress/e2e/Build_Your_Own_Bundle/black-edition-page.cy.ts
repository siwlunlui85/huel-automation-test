import { project } from "helpers/project";
import { step } from "helpers/step";
import { test } from "helpers/test";
import { GetBYOBPage } from "page-objects/BuildYourOwnBundle/black-edition-page";

project("BYOB_Page", (env) => {
  describe("Verify build your own bundle page redirects correctly", () => {
    test(
      "[Jira-14]",
      step("Given I am on the build your own bundle page", () => {
        cy.visit(env.GET_BYOB_URL);
      }),
      step("When I click on the Black Edition button", () => {
        GetBYOBPage.blackEdition.click();
      }),
      step("Then I am redirected to the Black Edition page", () => {
        cy.url().should(
          "eq",
          "https://uk.huel.com/products/build-your-own-bundle#/?product=huel-black-edition"
        );
      })
    );
  });

  describe("Continue button is disabled when no products are added", () => {
    test(
      "[Jira-17]",
      step("Given I am on the build your own bundle page", () => {
        cy.visit(env.GET_BYOB_URL);
      }),
      step("And I have clicked the accept cookie", () => {
        cy.get("#onetrust-accept-btn-handler").click();
      }),
      //step("When I haven't added any products in my cart", () => {
      //TO DO

      step("Then the continue button should be disabled", () => {
        // GetBYOBPage.continueButton.should("have.attr", "disabled", "true");
        // cy.get(".SummaryBarContinueButton")
        // cy.get("huel-button")
        //   .contains("Continue")

        // Find and click on a button inside the shadow DOM
        // cy.get('[data-testid="SummaryBarContinueButton"]')
        //   .shadow()
        //   .get("button")
        //   .should("be.disabled");
        // GetBYOBPage.continueButton.should("be.visible");

        //Note: A/B sites have different html, so have to check for a different element
        cy.get("body")
          .then(($body) => {
            if ($body.find(".SummaryBarContinueButton").length) {
              return ".SummaryBarContinueButton";
            } else if ($body.find(".InteractiveSummaryBarContent").length) {
              return ".InteractiveSummaryBarContent huel-button";
            }
          })
          .wrap((selector: string) => {
            cy.get(selector).shadow().find("button").should("be.disabled");
          });
      })
    );
  });
});
