// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-localstorage-commands';

import {
  mockCopyItem,
  mockGetChildren,
  mockGetPublicItems,
  mockGetItem,
  mockGetMember,
  mockGetCurrentMember,
  mockSignInRedirection,
  mockSignOut,
  mockGetItems,
  mockGetCategoryTypes,
  mockGetCategories,
  mockGetItemCategories,
} from './server';
import { MEMBERS } from '../fixtures/members';
import {
  SAMPLE_CATEGORIES,
  SAMPLE_CATEGORY_TYPES,
} from '../fixtures/categories';
import { PUBLISHED_ITEM } from '../fixtures/items';

Cypress.Commands.add(
  'setUpApi',
  ({
    items = [PUBLISHED_ITEM],
    members = Object.values(MEMBERS),
    currentMember = MEMBERS.ANNA,
    categories = SAMPLE_CATEGORIES,
    categoryTypes = SAMPLE_CATEGORY_TYPES,
    copyItemError = false,
    getItemError = false,
    getCurrentMemberError = false,
    getCategoriesError = false,
    getItemCategoriesError = false,
  } = {}) => {
    const cachedItems = JSON.parse(JSON.stringify(items));
    const cachedMembers = JSON.parse(JSON.stringify(members));

    cy.setCookie('session', currentMember ? 'somecookie' : null);

    mockGetItem(
      { items: cachedItems, currentMember },
      getItemError || getCurrentMemberError,
    );

    mockGetChildren({ items: cachedItems, currentMember });

    mockGetPublicItems(items);

    mockCopyItem(cachedItems, copyItemError);

    mockGetMember(cachedMembers);

    mockGetCurrentMember(currentMember, getCurrentMemberError);

    mockSignInRedirection();

    mockSignOut();

    mockGetItems({ items, currentMember });

    mockGetCategoryTypes(categoryTypes);

    mockGetCategories(categories, getCategoriesError);

    mockGetItemCategories(items, getItemCategoriesError);
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
