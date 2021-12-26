import { ALL_COLLECTION_ROUTE } from '../../support/constants';

describe('All Collections Page', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(ALL_COLLECTION_ROUTE);
  });

  // check if title and headings are displayed correctly
  it('display headings', () => {
    cy.get('h3').should('have.text', 'All Collections');

    cy.get(
      '#__next > div.makeStyles-root-1 > div.makeStyles-root-10 > div.makeStyles-mainWrapper-18 > main > h6',
    ).should('have.text', '3 collections available');
  });

  it('display side menu', () => {
    // side menu heading
    cy.get(
      '#__next > div.makeStyles-root-1 > div.makeStyles-root-10 > div.MuiDrawer-root.MuiDrawer-docked.makeStyles-drawer-13 > div > div.makeStyles-drawerHeader-15 > h5',
    ).should('have.text', 'Categories');

    // side menu categories
    cy.get(
      '#__next > div.makeStyles-root-1 > div.makeStyles-root-10 > div.MuiDrawer-root.MuiDrawer-docked.makeStyles-drawer-13 > div > ul:nth-child(6) > div > div > span',
    ).should('have.text', 'test_category');
  });

  it('display collections', () => {
    // verify 3 item cards are displayed
    const itemGrids = cy.get(
      '#__next > div.makeStyles-root-1 > div.makeStyles-root-10 > div.makeStyles-mainWrapper-18 > main > div',
    );
    itemGrids.children().should('have.length', 3);
  });
});
