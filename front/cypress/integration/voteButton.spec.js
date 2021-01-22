import testPlaces from "./testPlaces";
import testUtility from "./testUtility";

describe("VoteButton", function() {
  before(function() {
    cy.visit("http://localhost:3000/");
    cy.login();    
  });

  beforeEach(() => {   
    testUtility.prepare(testPlaces);
    cy.wait(1000);
    cy.login();
  });

  it("click button", function() {
    cy.contains("Vaskikello").parentsUntil(".cards").contains("Äänestä")
      .click();
    cy.wait(500);
    //cy.request("GET", "http://localhost:3001/api/places/")
    cy.contains("Vaskikello").parentsUntil(".cards")
      .contains("Olet äänestänyt tätä paikkaa 4-tien parhaaksi");
    cy.contains("Hirvaskangas").parentsUntil(".cards").contains("Äänestä")
      .click();      
    cy.wait(500);
    cy.contains("Hirvaskangas").parentsUntil(".cards")
      .contains("Olet äänestänyt tätä paikkaa 4-tien parhaaksi");
  });

  it("clicking button affects db", function() {
    cy.request("GET", "http://localhost:3001/api/places").should(response => {
      expect(response.body[1].votes).to.equal(88);
    });
    cy.contains("Vaskikello").parentsUntil(".cards").contains("Äänestä").click();
    cy.request("GET", "http://localhost:3001/api/places/cache/clear");
    cy.wait(500);
    cy.request("GET", "http://localhost:3001/api/places").should(response => {
      expect(response.body[1].votes).to.equal(89);
    });
  });

});