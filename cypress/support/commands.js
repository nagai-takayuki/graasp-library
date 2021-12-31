// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-localstorage-commands';

import {
  mockCopyItem,
  mockGetChildren,
  mockGetPublishedItems,
  mockGetMember,
  mockGetCurrentMember,
  mockGetOwnItems,
  mockSignInRedirection,
  mockSignOut,
  mockGetCategoryTypes,
  mockGetCategories,
  mockGetItemCategories,
  mockGetItemsInCategories,
  mockGetAvatar,
  mockGetItemThumbnail,
  mockGetItem,
} from './server';
import { MEMBERS } from '../fixtures/members';
import {
  SAMPLE_CATEGORIES,
  SAMPLE_CATEGORY_TYPES,
} from '../fixtures/categories';
import { PUBLISHED_ITEMS } from '../fixtures/items';

Cypress.Commands.add(
  'setUpApi',
  ({
    items = PUBLISHED_ITEMS,
    members = Object.values(MEMBERS),
    currentMember = MEMBERS.ANNA,
    categories = SAMPLE_CATEGORIES,
    categoryTypes = SAMPLE_CATEGORY_TYPES,
    copyItemError = false,
    getCurrentMemberError = false,
    getCategoriesError = false,
    getItemCategoriesError = false,
  } = {}) => {
    const cachedItems = JSON.parse(JSON.stringify(items));
    const cachedMembers = JSON.parse(JSON.stringify(members));

    cy.setCookie('session', currentMember ? 'somecookie' : null);

    mockGetChildren({ items, currentMember });

    mockGetPublishedItems(items);

    mockCopyItem(cachedItems, copyItemError);

    mockGetMember(cachedMembers);

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockGetItem(items, false);

    mockGetOwnItems(items);

    mockGetAvatar(members, false);

    mockGetItemThumbnail(items, false);

    mockSignInRedirection();

    mockSignOut();

    mockGetCategoryTypes(categoryTypes);

    mockGetCategories(categories, getCategoriesError);

    mockGetItemCategories(items, getItemCategoriesError);

    mockGetItemsInCategories(items, categories, false);
  },
);

Cypress.Commands.add(
  'visitAndMockWs',
  (visitRoute, sampleData, wsClientStub) => {
    cy.setUpApi(sampleData);
    cy.visit(visitRoute, {
      onBeforeLoad: (win) => {
        cy.stub(win, 'WebSocket', () => wsClientStub);
      },
    });
  },
);

Cypress.Commands.add(
  'clickElementInIframe',
  (iframeSelector, elementSelector) =>
    cy
      .get(iframeSelector)
      .then(($iframe) =>
        cy.wrap($iframe.contents().find(elementSelector)).click(),
      ),
);

Cypress.Commands.add(
  'checkContentInElementInIframe',
  (iframeSelector, elementSelector, text) =>
    cy
      .get(iframeSelector)
      .then(($iframe) =>
        cy
          .wrap($iframe.contents().find(elementSelector))
          .should('contain', text),
      ),
);
