describe('Cypress', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Page should have a title', () => {
    cy.title().should('include', 'KUBES');
  });

  it('Should use UTF-8', () => {
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });

  it('Should contain Name', () => {
    cy.contains('h2', 'Helge Falch');
  });

  it('Name should have a title', () => {
    cy.contains('p', 'System Developer');
  });

  it('Page should have hrefs', () => {
    cy.get('a').should('have.attr', 'href', 'https://github.com/helgelol/');
  });
});
