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
    cy.contains('h2', 'Helge Falch').should('be.visible');
  });

  it('Name should have a title', () => {
    cy.contains('p', 'System Developer').should('be.visible');
  });

  it('Page should have hrefs', () => {
    cy.get('a').should('have.attr', 'href', 'https://github.com/helgelol/');
  });

  it('Contact form renders', () => {
    cy.contains('button', 'Contact').click().should('be.visible');
    cy.get('form').should('be.visible');
    cy.contains('button', 'Send').should('be.visible');
  });
});
