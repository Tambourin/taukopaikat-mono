
describe('login', () => {
  before(function(){
    cy.visit("localhost:3000")
  })

  it('should successfully log into our app', () => {
    cy.contains("Kirjaudu sisään");
    cy.login();
    cy.contains("Kirjaudu ulos")
  });
});