/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Home Page Collections', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit('/');
  });

  // check if title and headings are displayed correctly
  it('display headings', () => {
    cy.get('h3')
      .first()
      .should('have.text', 'Browse Open Educational Resources');

    cy.get('div + h3').first().should('have.text', 'Graasp Selection');
    cy.get('h5 + h3').last().should('have.text', 'Discover');
  });

  it('display collections', () => {
    // verify 3 item cards are displayed
    const itemGrids = cy.get(
      '#__next > div.makeStyles-root-1 > div.makeStyles-wrapper-10 > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2',
    );
    itemGrids.children().should('have.length', 3);
  });
});
