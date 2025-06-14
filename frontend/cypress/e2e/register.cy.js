describe('Register Flow', () => {
  const FRONTEND_URL_REGISTER = 'http://localhost:3000/register';
  const FRONTEND_URL_LOGIN = 'http://localhost:3000/login';
  
  beforeEach(() => {
    // Clear cookies and local storage between tests
    cy.clearCookies();
    cy.clearLocalStorage();
  })

  it('should register with valid information and redirect to login page', () => {
    const uniqueId = Date.now().toString();
    const username = `testuser${uniqueId}`;
    const email = `testuser${uniqueId}@example.com`;
    const password = 'password123';

    cy.visit(FRONTEND_URL_REGISTER);

    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('input[placeholder="Password Again"]').should('be.visible');

    cy.get('input[placeholder="Username"]').type(username);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('input[placeholder="Password Again"]').type(password);

    cy.intercept('POST', '**/register').as('registerRequest');

    cy.get('.registerButton').click();

    cy.wait('@registerRequest').its('response.statusCode').should('eq', 200);

    cy.url().should('eq', FRONTEND_URL_LOGIN);

    cy.get('.loginLogo').should('be.visible');
    cy.get('.loginDesc').should('be.visible');
    cy.get('.loginBox').should('be.visible');
  });

  it('should show error when passwords do not match', () => {
    cy.visit(FRONTEND_URL_REGISTER);

    cy.get('input[placeholder="Username"]').type('testuser');
    cy.get('input[placeholder="Email"]').type('testuser@example.com');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('input[placeholder="Password Again"]').type('differentpassword');

    cy.get('.registerButton').click();

    cy.url().should('eq', FRONTEND_URL_REGISTER);
    cy.get('.error-msg').should('be.visible').and('contain', "Passwords don't match !");
  });

  it('should show error when username is already taken', () => {
    const existingUsername = 'didi'; // Assuming this username exists based on the login test
    
    cy.visit(FRONTEND_URL_REGISTER);

    // Fill in the form with an existing username
    cy.get('input[placeholder="Username"]').type(existingUsername);
    cy.get('input[placeholder="Email"]').type('new_email@example.com');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('input[placeholder="Password Again"]').type('password123');

    // Intercept the register request
    cy.intercept('POST', '**/register').as('registerRequest');

    // Submit the form
    cy.get('.registerButton').click();

    // Wait for the register request and verify it failed with 400
    cy.wait('@registerRequest').its('response.statusCode').should('eq', 400);

    // Check for error message about duplicate username
    cy.get('.error-msg').should('be.visible');
    cy.url().should('eq', FRONTEND_URL_REGISTER);
  });

  it('should show error when email is already taken', () => {
    // Use an email that we know exists
    const existingEmail = 'didi@gmail.com'; // Assuming this email exists based on the login test
    
    cy.visit(FRONTEND_URL_REGISTER);

    // Fill in the form with an existing email
    cy.get('input[placeholder="Username"]').type('new_username');
    cy.get('input[placeholder="Email"]').type(existingEmail);
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('input[placeholder="Password Again"]').type('password123');

    // Intercept the register request
    cy.intercept('POST', '**/register').as('registerRequest');

    // Submit the form
    cy.get('.registerButton').click();

    // Wait for the register request and verify it failed with 400
    cy.wait('@registerRequest').its('response.statusCode').should('eq', 400);

    // Check for error message about duplicate email
    cy.get('.error-msg').should('be.visible');
    cy.url().should('eq', FRONTEND_URL_REGISTER);
  });
});
