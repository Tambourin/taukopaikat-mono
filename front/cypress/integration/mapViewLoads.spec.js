describe("Can navigate to map view", function() {
  it("map iframe exists", function() {
    cy.visit("http://localhost:3001");
    cy.contains("Kartalla")
      .click();
    cy.get("iframe");
  });
});