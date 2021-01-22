import testPlaces from "./testPlaces";
import testUtility from "./testUtility";

describe("Arrange", function() {
  beforeEach(() => {
    testUtility.prepare(testPlaces);
  });

  it("Arrange by", function() {
    cy.wait(500);
    cy.contains("Parhaat ensin").click();
    cy.contains("Aakkosjärjestys").click();
    cy.get(".card").first().contains("ABC Hirvas");
    cy.get(".card").last().contains("Vaski");
    cy.contains("Aakkosjärjestys").click();
    cy.contains("Pohjoisesta").click();
    cy.get(".card").first().contains("Vaski");
    cy.get(".card").eq(1).contains("ABC");
    cy.contains("Pohjoisesta").click();
    cy.contains("Etelästä").click();
    cy.get(".card").first().contains("ABC Kuortti");
    cy.get(".card").last().contains("Vaski");
    cy.contains("Etelästä").click();
    cy.contains("Parhaat ensin").click();
    cy.get(".card").first().contains("Vaski");
    cy.get(".card").last().contains("ABC");
  });
});