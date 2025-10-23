describe('Cat Facts API Tests', () => {
  const baseUrl = 'https://catfact.ninja/fact';

  it('should return status code 200', () => {
    cy.request(baseUrl).its('status').should('eq', 200);
  });

  it('should return a JSON response with fact and length', () => {
    cy.request(baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('fact');
      expect(response.body).to.have.property('length');
    });
  });

  [10, 20].forEach((minLength) => {
    it(`should return a fact with at least ${minLength} characters`, () => {
      cy.request(baseUrl).then((response) => {
        expect(response.body.fact.length).to.be.at.least(minLength);
      });
    });
  });

  it('should return content-type as application/json', () => {
    cy.request(baseUrl).its('headers').its('content-type').should('include', 'application/json');
  });
});