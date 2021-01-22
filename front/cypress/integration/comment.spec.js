import { testPlaces } from "./testPlaces";

describe("making comments", function() {
  beforeEach(() => {
    cy.request("GET", "http://localhost:3001/api/places/delete");
    cy.request("POST", "http://localhost:3001/api/places", testPlaces[0]);
    cy.visit("http://localhost:3000");
    cy.contains("ABC Kuortti").click();
    cy.wait(500);
  });

  it("write comment", function() {
    cy.get("textarea").type("This is test comment");
    cy.contains("Jätä oma kommenttisi paikasta").click();
    cy.get("input").type("helsinki");
    cy.contains("Lähetä").click();
    cy.contains("This is test comment");
    cy.get("textarea").should("have.value", "");
  });

  it("Send button is disabled if comment is too short", function() {
    cy.get("textarea").type("xxx");
    cy.get("form").within(() => {
      cy.get("button").should("be.disabled");
    });
    cy.get("textarea").type("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    cy.get("form").within(() => {
      cy.get("button").should("not.be.disabled");
    });
  });
});