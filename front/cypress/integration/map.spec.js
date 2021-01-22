import testPlaces from "./testPlaces";
import testUtility from "./testUtility";

describe("mapView tests", function() {
  before(() => {
    testUtility.prepare(testPlaces);
  });

  it("can open map view", function() {
    cy.contains("Kartalla").click();
    cy.wait(300);
    cy.get("iframe");
  });

  it("marker can be found", function() {
    cy.get("#show_all").click();    
    cy.get("div[title='ABC Kuortti']");    
  });


  it("range input works with min and max", function() {
    cy.get("#show_all").click();
    cy.get("[src='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png']")
      .should('have.length', testPlaces.length * 2); //img with this src appears twice per place
    cy.get("#show_only_best").click();
    cy.get("[src='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png']")
      .should('have.length', 2);
  });

  it("marker can be clicked to show infoWindow", function() {
    cy.get("#show_all").click();  
    cy.get(`div[title="${testPlaces[0].name}"]`).click();
    cy.get("#infoWindowContent");
    cy.get("h4").contains(testPlaces[0].name);
  });
});