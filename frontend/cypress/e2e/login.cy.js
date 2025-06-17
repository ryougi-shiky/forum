describe('Login Flow', () => {
  const FRONTEND_URL_LOGIN = `${Cypress.config().baseUrl}/login`;
  const FRONTEND_URL_HOME = `${Cypress.config().baseUrl}/`;
  beforeEach(() => {
  })

  it('should login with correct credentials', () => {
    cy.visit(FRONTEND_URL_LOGIN)

    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');

    cy.get('input[placeholder="Email"]').type('didi@gmail.com');
    cy.get('input[placeholder="Password"]').type('yzm7046406');

    cy.get('[data-testid="login-button"]').click();

    cy.url().should('eq', FRONTEND_URL_HOME);

    cy.get('.topbarContainer').should('be.visible');
    cy.get('.sidebar').should('be.visible');
    cy.get('.feed').should('be.visible');
    cy.get('.rightbar').should('be.visible');
  })

  it('should return 404 error with incorrect credentials', () => {
    cy.intercept('POST', '**/login').as('loginRequest');

    cy.visit(FRONTEND_URL_LOGIN);

    cy.get('input[placeholder="Email"]').type('wrong@email.com');
    cy.get('input[placeholder="Password"]').type('wrongpass');
    cy.get('[data-testid="login-button"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 404);
  })
})
