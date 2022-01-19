import { ALL_COLLECTIONS_ROUTE } from '../../support/constants';
import { SAMPLE_CATEGORIES } from '../../fixtures/categories';
import { PUBLISHED_ITEMS } from '../../fixtures/items';

import {
  SUBTITLE_TEXT_SELECTOR,
  SIDEMENU_HEADING_SELECTOR,
  ITEM_GRIDS_SELECTOR,
  CLEAR_EDUCATION_LEVEL_SELECTION_SELECTOR,
  OPEN_MENU_BUTTON_SELECTOR,
  CLOSE_MENU_BUTTON_SELECTOR,
  TITLE_TEXT_SELECTOR,
  buildEducationLevelOptionSelector,
} from '../../support/selectors';

describe('All Collections Page', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(ALL_COLLECTIONS_ROUTE);
  });

  // check if title and headings are displayed correctly
  it('display headings & side menu & collections', () => {
    cy.get(TITLE_TEXT_SELECTOR).should('have.text', 'All Collections');

    cy.get(SUBTITLE_TEXT_SELECTOR).should(
      'have.text',
      `${PUBLISHED_ITEMS.length} collections available`,
    );

    // side menu heading
    cy.get(SIDEMENU_HEADING_SELECTOR).should('have.text', 'Categories');

    // verify 5 item cards are displayed
    const itemGrids = cy.get(ITEM_GRIDS_SELECTOR);
    itemGrids.children().should('have.length', PUBLISHED_ITEMS.length);
  });
});

describe('Side Menu', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(ALL_COLLECTIONS_ROUTE);
  });

  it('display menu options', () => {
    cy.get(buildEducationLevelOptionSelector(0)).should(
      'have.text',
      SAMPLE_CATEGORIES[0].name,
    );
  });

  it('close side menu and reopen', () => {
    cy.get(CLOSE_MENU_BUTTON_SELECTOR).click();
    cy.get(SIDEMENU_HEADING_SELECTOR).should('not.be.visible');
    cy.get(OPEN_MENU_BUTTON_SELECTOR).click();
    cy.get(SIDEMENU_HEADING_SELECTOR).should('have.text', 'Categories');
  });

  it('select/unselect categories', () => {
    const selectCategoryButton = cy.get(buildEducationLevelOptionSelector(0));
    selectCategoryButton.click();
    const itemGrids = cy.get(ITEM_GRIDS_SELECTOR);
    const items = PUBLISHED_ITEMS.filter(({ categories }) =>
      categories?.includes(SAMPLE_CATEGORIES[0].id),
    );
    itemGrids.children().should('have.length', items.length);

    // clear selection
    cy.get(CLEAR_EDUCATION_LEVEL_SELECTION_SELECTOR).click();

    // check display
    cy.get(ITEM_GRIDS_SELECTOR)
      .children()
      .should('have.length', PUBLISHED_ITEMS.length);
  });
});
