import { testPlaces } from "./testPlaces";

describe("single palace page tests", function() {
  beforeEach(() => {
    cy.request("GET", "http://localhost:3001/api/places/delete");
    cy.request("POST", "http://localhost:3001/api/places", testPlaces[0]);
    cy.visit("http://localhost:3000");
    cy.contains("ABC Kuortti").click();
    cy.wait(1500);
  });

  it("can visit PlacePage", function() {    
    cy.contains("ABC Kuortti");
    cy.contains("Pertunmaa");
    cy.contains("testikuvaus");
    cy.contains("Äänestä parhaaksi");
    cy.contains("Kommentit");
    cy.contains("Vaihtoehtoja");
    cy.contains("Näytä Google");    
  });

  it("can see opening hours", function() {
    cy.contains("Aukiolo").click();
    cy.contains("maanantai");
  });

  it("webpage link", function() {
    cy.get("#webLink").should("have.attr", "href", "https://www.abcasemat.fi/fi/asemat/abc-kuortti");
  });

  it("vote-button works on SinglePlacePage", function() {
    cy.get(".value").contains("0");
    cy.contains("Äänestä parhaaksi").click();
    cy.wait(500);
    cy.get(".value").contains("1");
  });
});

describe("Before page has been able to load", function(){  
  it("Loader is shown", function() {
    cy.request("GET", "http://localhost:3001/api/places/delete");
    cy.request("POST", "http://localhost:3001/api/places", testPlaces[0]);
    cy.visit("http://localhost:3000");
    cy.contains("ABC Kuortti").click();
    cy.get(".loading");
  });

  it("Try to load with wrong id", function(){
    cy.visit("http://localhost:3000/totallywrongid");
    cy.contains("Tietojen lataus epäonnistui");
  });
});