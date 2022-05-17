import { MY_LIST_ROUTE } from '../../../src/config/routes';
import { PUBLISHED_ITEMS } from '../../fixtures/items';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import { CURRENT_USER } from '../../fixtures/members';
import {
  buildMyListNavigationTabId,
  MY_LIKES_COLLECTIONS_ID,
} from '../../../src/config/selectors';
import { MY_LIST_TABS } from '../../support/constants';
import { ITEM_LIKES } from '../../fixtures/itemLikes';

describe('My Favorite Items', () => {
  describe('Current user', () => {
    // check if title and headings are displayed correctly
    it('display liked items', () => {
      cy.setUpApi({ currentMember: CURRENT_USER, items: PUBLISHED_ITEMS });
      cy.visit(MY_LIST_ROUTE);

      // click my likes tab
      cy.get(`#${buildMyListNavigationTabId(MY_LIST_TABS.MY_LIKES)}`).click();

      cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
        expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      });
      cy.wait('@getLikedItems');
      cy.get(`#${MY_LIKES_COLLECTIONS_ID}`)
        .children()
        .should('have.length', ITEM_LIKES.length);
    });
  });
});
