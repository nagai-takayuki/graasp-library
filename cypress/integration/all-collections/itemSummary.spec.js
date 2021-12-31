import { ALL_COLLECTION_ROUTE } from '../../support/constants';

import {
  buildItemInGridSelector,
  ITEM_SUMMARY_CHILDREN_GRIDS_SELECTOR,
  ITEM_SUMMARY_TITLE_SELECTOR,
} from '../../support/selector';

describe('All Collections to Item Page', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(ALL_COLLECTION_ROUTE);
  });

  it('display item summary and children items', () => {
    cy.get(buildItemInGridSelector(1)).click();
    cy.wait(['@getItem']).then(() => {
      cy.get(ITEM_SUMMARY_TITLE_SELECTOR).should(
        'have.text',
        'parent public item',
      );
      cy.wait(3000);
      cy.get(ITEM_SUMMARY_CHILDREN_GRIDS_SELECTOR)
        .children()
        .should('have.length', 2);
    });
  });
});
