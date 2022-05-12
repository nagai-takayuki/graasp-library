import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { buildCollectionRoute } from '../../../src/config/routes';
import { COLLECTION_LOADING_TIME } from '../../support/constants';
import { SUMMARY_CC_LICENSE_CONTAINER_ID } from '../../support/selectors';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';

describe('CC License in Summary', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    it(`Display item's cc license for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[0];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      cy.get(`#${SUMMARY_CC_LICENSE_CONTAINER_ID}`).should('be.exist');
    });

    it(`No cc license to display for ${environment.currentMember.name}`, () => {
      cy.setUpApi(environment);

      const item = PUBLISHED_ITEMS[2];
      cy.visit(buildCollectionRoute(item.id));
      cy.wait(COLLECTION_LOADING_TIME);

      cy.get(`#${SUMMARY_CC_LICENSE_CONTAINER_ID}`).should('not.exist');
    });
  });
});
