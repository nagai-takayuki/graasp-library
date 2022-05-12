import { MY_LIST_ROUTE } from '../../../src/config/routes';
import { getNumberOfOwnPublishedItems, PUBLISHED_ITEMS } from '../../fixtures/items';
import {
  MY_LIKED_COLLECTIONS_GRID,
} from '../../support/selectors';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';
import { CURRENT_USER } from '../../fixtures/members';
import { buildMyListNavigationTabId } from '../../../src/config/selectors';
import { MY_LIST_TABS } from '../../support/constants';

describe('My Published Items', () => {
  describe('Current user', () => {
    // check if title and headings are displayed correctly
    it('display published items', () => {
      cy.setUpApi({currentMember: CURRENT_USER, items: PUBLISHED_ITEMS});
      cy.visit(MY_LIST_ROUTE);

      // click my likes tab
      cy.get(`#${buildMyListNavigationTabId(MY_LIST_TABS.MY_PUBLISHMENTS)}`).click();

      cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
        expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
      });
      cy.wait('@getLikedItems');
      cy.get(MY_LIKED_COLLECTIONS_GRID)
      .children()
      .should(
        'have.length',
        getNumberOfOwnPublishedItems(CURRENT_USER.id),
      );
    });
  });
});
