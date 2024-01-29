const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    projectId: "8h4g1d",
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  video: true,
});
