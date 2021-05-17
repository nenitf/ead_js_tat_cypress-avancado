const {
  Before,
  After,
  Given,
  Then
} = require("cypress-cucumber-preprocessor/steps");

// this will get called before each scenario
Before(() => {
  counter += 1;
});

// this will only get called before scenarios tagged with @foo
Before({ tags: "@foo" }, () => {
  counter += 1;
});

let counter = 0;

Given("counter has been reset", () => {
  counter = 0;
});

When("counter is incremented", () => {
  counter += 1;
});

Then("counter equals {int}", value => {
  expect(counter).to.equal(value);
});
