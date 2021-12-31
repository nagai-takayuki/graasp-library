import { ALL_COLLECTION_ROUTE } from '../../support/constants';

import {
  ITEM_GRIDS_SELECTOR,
  ITEM_SUMMARY_CHILDREN_GRIDS_SELECTOR,
  ITEM_SUMMARY_TITLE_SELECTOR,
} from '../../support/selector';

describe('All Collections Page', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(ALL_COLLECTION_ROUTE);
  });

  it('display item summary', () => {
    cy.get(ITEM_GRIDS_SELECTOR + ' > div:nth-child(1)').click();
    cy.wait(['@getItem']).then(() => {
      cy.get(ITEM_SUMMARY_TITLE_SELECTOR).should(
        'have.text',
        'parent public item',
      );
      cy.wait(['@getChildren']).then(() => {
        cy.get(ITEM_SUMMARY_CHILDREN_GRIDS_SELECTOR)
          .children()
          .should('have.length', 2);
      });
    });
  });
});
