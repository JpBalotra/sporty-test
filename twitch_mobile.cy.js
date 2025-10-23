describe('Twitch Mobile Streamer Flow', () => {
  it('Searches StarCraft II and captures streamer page', () => {
    // Step 1: Visit Twitch
    cy.visit('/');

    // Step 2: Click the search icon
    cy.get('[data-a-target="top-nav-search-button"]', { timeout: 10000 }).click();

    // Step 3: Input "StarCraft II"
    cy.get('input[type="search"]').type('StarCraft II{enter}');
    cy.wait(3000); // wait for results to load

    // Step 4: Scroll down twice
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(1000);
    cy.scrollTo('bottom', { duration: 1000 });
    cy.wait(1000);

    // Step 5: Select one streamer
    cy.get('a[data-a-target="preview-card-title-link"]', { timeout: 10000 })
      .first()
      .click();

    // Step 6: Handle modal if present
    cy.get('body').then(($body) => {
      if ($body.find('button[aria-label="Close"]').length > 0) {
        cy.get('button[aria-label="Close"]').click();
      }
    });

    // Wait for video and page to load
    cy.get('video', { timeout: 15000 }).should('exist');
    cy.wait(2000); // ensure full load

    // Take screenshot
    cy.screenshot('streamer-page', { capture: 'fullPage' });
  });
});