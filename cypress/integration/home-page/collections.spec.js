import { HOME_ROUTE } from '../../support/constants';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import {
  ITEM_GRIDS_SELECTOR,
  TITLE_TEXT_SELECTOR,
} from '../../support/selectors';

describe('Home Page', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(HOME_ROUTE);
  });

  // check if title and headings are displayed correctly
  it('display headings & collections', () => {
    cy.get(TITLE_TEXT_SELECTOR)
      .first()
      .should('have.text', 'Browse Open Educational Resources');

    cy.get('div + h3').first().should('have.text', 'Graasp Selection');
    cy.get('h5 + h3').last().should('have.text', 'Discover');

    // verify 5 item cards are displayed
    cy.get(ITEM_GRIDS_SELECTOR)
      .children()
      .should('have.length', PUBLISHED_ITEMS.length);
  });
});
