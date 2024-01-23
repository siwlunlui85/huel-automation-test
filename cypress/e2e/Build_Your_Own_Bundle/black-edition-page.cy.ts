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

        // I wanted to test if the button is disabled, but the element I am selecting isn't actually a button, since the button is in the shadow DOM of that element.
        // So I needed to do this instead to find and click on a button inside the shadow DOM
        // cy.get('[data-testid="SummaryBarContinueButton"]')
        // cy.get("huel-button").contains("Continue")
        //   .shadow()
        //   .get("button")
        //   .should("be.disabled");
        // GetBYOBPage.huelButton.should("be.visible");
        // GetBYOBPage.continueButton.should("be.visible");

        //**I noticed the A/B testing is enabled on the site, so I was adding conditional logic using the below code which is a bad practice. The above code is best practice to run for each variant.

        // If both A/B env have the data-* attribute on the buttons, this should work:
        // GetBYOBPage.continueButton.should("have.attr", "disabled", "true");

        //Note: Even on the page without the data-testid it still seems to find the button before the page is fully generated which means that the page with the data-testid is generated first and then overridden by the one without data-testid, but cypress manages to grab the button fast enough and still checks it so it works for this below test, but i'm not sure if it will work if you start adding things into the cart because when you start adding things into the cart, the whole page might have loaded by then but either way, that's a problem for another time.
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
