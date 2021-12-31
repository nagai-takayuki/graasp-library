import { ALL_COLLECTION_ROUTE } from '../../support/constants';

import {
  SUBTITLE_SELECTOR,
  SIDEMENU_HEADING_SELECTOR,
  SIDEMENU_OPTION_SELECTOR,
  CATEGORY_BUTTON_SELECTOR,
  ITEM_GRIDS_SELECTOR,
  CLEAR_SELECTION_SELECTOR,
  OPEN_MENU_BUTTON_SELECTOR,
  CLOSE_MENU_BUTTON_SELECTOR,
  TITLE_TEXT_SELECTOR,
} from '../../support/selector';

describe('All Collections Page', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(ALL_COLLECTION_ROUTE);
  });

  // check if title and headings are displayed correctly
  it('display headings', () => {
    cy.get(TITLE_TEXT_SELECTOR).should('have.text', 'All Collections');

    cy.get(SUBTITLE_SELECTOR).should('have.text', '5 collections available');
  });

  it('display side menu', () => {
    // side menu heading
    cy.get(SIDEMENU_HEADING_SELECTOR).should('have.text', 'Categories');
  });

  it('display collections', () => {
    // verify 5 item cards are displayed
    const itemGrids = cy.get(ITEM_GRIDS_SELECTOR);
    itemGrids.children().should('have.length', 5);
  });
});

describe('Side Menu', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(ALL_COLLECTION_ROUTE);
  });

  it('display menu options', () => {
    cy.get(SIDEMENU_OPTION_SELECTOR).should('have.text', 'test_category');
  });

  it('close side menu and reopen', () => {
    cy.get(CLOSE_MENU_BUTTON_SELECTOR).click();
    cy.get(SIDEMENU_HEADING_SELECTOR).should('not.be.visible');
    cy.get(OPEN_MENU_BUTTON_SELECTOR).click();
    cy.get(SIDEMENU_HEADING_SELECTOR).should('have.text', 'Categories');
  });

  it('select/unselect categories', () => {
    const selectCategoryButton = cy.get(CATEGORY_BUTTON_SELECTOR);
    selectCategoryButton.click();
    const itemGrids = cy.get(ITEM_GRIDS_SELECTOR);
    itemGrids.children().should('have.length', 1);

    // clear selection
    cy.get(CLEAR_SELECTION_SELECTOR).click();

    // check display
    cy.get(ITEM_GRIDS_SELECTOR).children().should('have.length', 5);
  });
});
