import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { ALL_COLLECTIONS_ROUTE, LOADING_TIME } from '../../support/constants';
import {
  buildItemInGridSelector,
  CHILDREN_ITEMS_GRID_SELECTOR,
  ITEM_SUMMARY_TITLE_SELECTOR,
} from '../../support/selectors';
import { isChild } from '../../support/utils';

describe('All Collections to Item Page', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(ALL_COLLECTIONS_ROUTE);
  });

  it('display item summary and children items', () => {
    cy.wait(LOADING_TIME);
    cy.get(buildItemInGridSelector(0)).click();
    cy.wait('@getItem').then(() => {
      const clickItem = PUBLISHED_ITEMS[0];
      cy.get(ITEM_SUMMARY_TITLE_SELECTOR).should('have.text', clickItem.name);
      cy.wait(LOADING_TIME);
      const children = PUBLISHED_ITEMS.filter(isChild(clickItem.id));
      cy.get(CHILDREN_ITEMS_GRID_SELECTOR)
        .children()
        .should('have.length', children.length);
    });
  });
});
