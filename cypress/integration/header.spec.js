import {
  HOME_ROUTE,
  ALL_COLLECTION_ROUTE,
  MY_LIST_ROUTE,
} from '../support/constants';

import {
  TITLE_TEXT_SELECTOR,
  MY_LIST_TITLE_TEXT_SELECTOR,
  HEADER_ALL_COLLECTION_SELECTOR,
  HEADER_GRAASP_EXPLORER_SELECTOR,
  HEADER_MY_LIST_SELECTOR,
} from '../support/selector';

describe('Header Bar', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(HOME_ROUTE);
  });

  it('click "all collections" then back', () => {
    cy.get(HEADER_ALL_COLLECTION_SELECTOR).click();
    cy.location('pathname').should('eq', ALL_COLLECTION_ROUTE);
    cy.get(TITLE_TEXT_SELECTOR).should('have.text', 'All Collections');
    cy.get(HEADER_GRAASP_EXPLORER_SELECTOR).click();
    cy.location('pathname').should('eq', HOME_ROUTE);
  });

  it('click "my list" then back', () => {
    cy.get(HEADER_MY_LIST_SELECTOR).click();
    cy.location('pathname').should('eq', MY_LIST_ROUTE);
    cy.get(MY_LIST_TITLE_TEXT_SELECTOR).should('have.text', 'My Collections');
    cy.get(HEADER_GRAASP_EXPLORER_SELECTOR).click();
    cy.location('pathname').should('eq', HOME_ROUTE);
  });
});
