import testPlaces from "./testPlaces";
import testUtility from "./testUtility";

const testPlace = testPlaces[0];

describe("Filter", function() {
  beforeEach(() => {
    testUtility.prepare([ testPlace ]);
  });

  it("filter highway", function() {
    cy.get("#highwayFilterDropdown").click();
    cy.contains("1").click();
    cy.contains("Haku ei tuottanut tuloksia");
    cy.get("#highwayFilterDropdown").click();
    cy.contains(testPlace.highway + " /").click();
    cy.contains(testPlace.name);
  });

  it("filter by text search", function() {
    cy.get("#searchWordInput").type("hölynpölynpöly");
    cy.contains("Haku ei tuottanut tuloksia");
    cy.get("#searchWordInput").clear();
    cy.get("#searchWordInput").type(testPlace.name.substring(0, 3));
    cy.contains(testPlace.name);
    cy.get("#searchWordInput").clear();
  });

  it("filter by selcting services", function() {
    cy.contains("Ei kuulu ketjuun").click();
    if (!testPlace.services.doesNotBelongToChain) {
      cy.contains("Haku ei tuottanut tuloksia");
    } else {
      cy.contains(testPlace.name);
    }    
    cy.contains("Ei kuulu ketjuun").click();

    cy.contains("Auki 24 h").click();
    if (!testPlace.services.isOpenTwentyFourHours) {
      cy.contains("Haku ei tuottanut tuloksia");
    } else {
      cy.contains(testPlace.name);
    }
    cy.contains("Auki 24 h").click();

    cy.contains("Palkittu").click();
    if (!testPlace.services.hasBeenAvarded) {
      cy.contains("Haku ei tuottanut tuloksia");
    } else {
      cy.contains(testPlace.name);
    }
    cy.contains("Palkittu").click();

    cy.contains("Nähtävyys").click();
    if (!testPlace.services.isAttraction) {
      cy.contains("Haku ei tuottanut tuloksia");
    } else {
      cy.contains(testPlace.name);
    }
    cy.contains("Nähtävyys").click();

    cy.contains("Kesäkahvila").click();
    if (!testPlace.services.isSummerCafe) {
      cy.contains("Haku ei tuottanut tuloksia");
    } else {
      cy.contains(testPlace.name);
    }
    cy.contains("Kesäkahvila").click();

    cy.contains("Huoltoasema").click();
    if (!testPlace.services.isGasStation) {
      cy.contains("Haku ei tuottanut tuloksia");
    } else {
      cy.contains(testPlace.name);
    }
    cy.contains("Huoltoasema").click();
    
    cy.contains("Grilli").click();
    if (!testPlace.services.isGrill) {
      cy.contains("Haku ei tuottanut tuloksia");
    } else {
      cy.contains(testPlace.name);
    }
    cy.contains("Grilli").click();
  });
});