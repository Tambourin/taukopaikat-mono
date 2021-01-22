import testPlaces from "./testPlaces";
import testUtility from "./testUtility";

describe("PlacesList", function() {
  before(() => {
    testUtility.prepare(testPlaces);
  });

  it("places are listed with right content", function() {
    cy.wait(500);
    cy.get(".card").should("have.length", 3);
    cy.get(".card")
      .first()
      .children()
      .find(".road_number");
    cy.get(".card")
      .contains("Vaskikello")
      .parentsUntil(".cards")
      .children()
      .contains("Ei kuulu ketjuun");
    testPlaces.forEach(place => {
      cy.contains(place.name);
      cy.contains(place.city)
    });    
  });

  it("place voted best has best place-ribbon", function() {
    cy.wait(500);
    cy.contains("Vaskikello")
      .parentsUntil(".cards")
      .children()
      .contains("paras taukopaikka");
  });

  it("showMore", function() {
    cy.contains("Kaikki tulokset ladattu");
    testUtility.addPlaces(10);
    cy.get(".card").should("have.length", 10);
    cy.contains("Näytä lisää tuloksia").click();
    cy.get(".card").should("have.length", 13);
    cy.contains("Kaikki tulokset ladattu");
  })
});