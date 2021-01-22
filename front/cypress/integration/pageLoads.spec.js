describe("PlacesList", function() {
  it("places are listed", function() {
    cy.visit("http://localhost:3001");
    cy.contains("Listana");
    cy.contains("Valtatie 4:n paras taukopaikka");
    cy.contains("Ota yhteyttä");
    cy.get(".card");
  });
});