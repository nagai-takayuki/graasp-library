import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { buildCollectionRoute } from '../../../src/config/routes';
import { COLLECTION_LOADING_TIME } from '../../support/constants';
import { SUMMARY_CATEGORIES_CONTAINER_ID } from '../../support/selectors';
import { SAMPLE_CATEGORIES } from '../../fixtures/categories';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';

describe('Categories in Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(`Display item's categories for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      item.categories.forEach(({ categoryId }) => {
        const categoryName = SAMPLE_CATEGORIES.find(
          ({ id }) => id === categoryId,
        ).name;
        cy.get(`#${SUMMARY_CATEGORIES_CONTAINER_ID}`).should(
          'contain',
          categoryName,
        );
      });
    });

    it(`No category to display for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[2];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      cy.get(`#${SUMMARY_CATEGORIES_CONTAINER_ID}`).should('not.exist');
    });
  });
});
