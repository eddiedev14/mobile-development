describe('MediClinic App', () => {
  it('redirects to the login page', () => {
    cy.visit('/');
    cy.contains('h1', 'Login');
    cy.contains('Iniciar Sesión');
  });
})