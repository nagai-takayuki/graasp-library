import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { buildCollectionRoute } from '../../../src/config/routes';
import { COLLECTION_LOADING_TIME } from '../../support/constants';
import { SUMMARY_TAGS_CONTAINER_ID } from '../../support/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';

describe('Tags in Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(`Display item's tags for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      item.settings.tags.forEach((tag) => {
        cy.get(`#${SUMMARY_TAGS_CONTAINER_ID}`).should('contain', tag);
      });
    });

    it(`No tag to display for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[2];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      cy.get(`#${SUMMARY_TAGS_CONTAINER_ID}`).should('not.exist');
    });
  });
});
