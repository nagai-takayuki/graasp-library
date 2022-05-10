import { MY_LIST_ROUTE } from '../../../src/config/routes';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import {
  MY_FAVORITES_COLLECTIONS_GRID,
} from '../../support/selectors';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import { buildMemberWithFavorites, FAVORITE_ITEMS } from '../../fixtures/members';

describe('My Favorite Items', () => {
  describe('Current user', () => {
    // check if title and headings are displayed correctly
    it('display favorite items', () => {
      cy.setUpApi({currentMember: buildMemberWithFavorites(FAVORITE_ITEMS), items: PUBLISHED_ITEMS});
      cy.visit(MY_LIST_ROUTE);

      // verify item cards are displayed
      cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
        expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      });
      cy.wait('@getCurrentMember');
      cy.get(MY_FAVORITES_COLLECTIONS_GRID)
      .children()
      .should(
        'have.length',
        FAVORITE_ITEMS.length,
      );
    });
  });
});
