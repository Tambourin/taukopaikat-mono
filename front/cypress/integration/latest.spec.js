import testPlaces from "./testPlaces";
import testUtility from "./testUtility";

describe("latest", function() {
  
  beforeEach(() => {
    testUtility.prepare(testPlaces);
    cy.contains("ABC Kuortti").click();
    cy.wait(500);
    cy.get("textarea").type("This is test comment");
    cy.contains("Jätä oma kommenttisi paikasta").click();
    cy.get("input").type("helsinki");
    cy.contains("Lähetä").click();
    cy.wait(500);
  });

  it("latest comment", function() {
    cy.visit("http://localhost:3000");
    cy.get("#latest").contains("ABC Kuortti");
    cy.get("#latest").contains("This is test comment");

    cy.contains("Vaskikello").click();
    cy.wait(500);
    cy.get("textarea").type("Another comment");
    cy.contains("Jätä oma kommenttisi paikasta").click();
    cy.get("input").type("helsinki");
    cy.contains("Lähetä").click();
    cy.wait(500);

    cy.visit("http://localhost:3000");
    cy.get("#latest").contains("Vaskikello");
    cy.get("#latest").contains("Another comment");
  });

});