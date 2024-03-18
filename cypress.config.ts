const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "8h4g1d",
    setupNodeEvents() {
      module.exports = (
        on: (arg0: string, arg1: { generateOTP: any }) => void
      ) => {
        on("task", {
          generateOTP: require("cypress-otp"),
        });
      };
      // implement node event listeners here
    },
  },
  video: true,
  experimentalModifyObstructiveThirdPartyCode: true,
});
