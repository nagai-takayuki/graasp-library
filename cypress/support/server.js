import { StatusCodes } from 'http-status-codes';
import qs from 'querystring';
import { API_ROUTES } from '@graasp/query-client';
import { MEMBERS } from '../fixtures/members';
import {
  DEFAULT_GET,
  ID_FORMAT,
  parseStringToRegExp,
  getItemById,
  isChild,
  isRootItem,
  getMemberById,
} from './utils';
import { ITEM_PUBLISHED_TAG } from '../fixtures/itemTags';
import { THUMBNAIL_EXTENSION } from './constants';

const {
  buildGetPublicItemsWithTag,
  buildGetChildrenRoute,
  buildGetPublicChildrenRoute,
  GET_OWN_ITEMS_ROUTE,
  buildGetMember,
  ITEMS_ROUTE,
  GET_CURRENT_MEMBER_ROUTE,
  buildSignInPath,
  SIGN_OUT_ROUTE,
  buildGetMembersRoute,
  GET_CATEGORY_TYPES_ROUTE,
  buildGetCategoriesRoute,
} = API_ROUTES;

const API_HOST = Cypress.env('API_HOST');
const AUTHENTICATION_HOST = Cypress.env('AUTHENTICATION_HOST');

const checkMembership = ({ item, currentMember }) => {
  // mock membership
  const creator = item?.creator;
  const haveMembership =
    creator === currentMember.id ||
    item.memberships?.find(({ memberId }) => memberId === currentMember.id);

  return haveMembership;
};

export const redirectionReply = {
  headers: { 'content-type': 'application/json' },
  statusCode: StatusCodes.OK,
  body: null,
};

export const mockGetCurrentMember = (
  currentMember = MEMBERS.ANNA,
  shouldThrowError = false,
) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${API_HOST}/${GET_CURRENT_MEMBER_ROUTE}`,
    },
    ({ reply }) => {
      if (shouldThrowError) {
        return reply({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: null,
        });
      }

      // might reply empty user when signed out
      return reply({ statusCode: StatusCodes.OK, body: currentMember });
    },
  ).as('getCurrentMember');
};

export const mockGetOwnItems = (items) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${API_HOST}/${GET_OWN_ITEMS_ROUTE}`,
    },
    (req) => {
      const own = items.filter(isRootItem);
      req.reply(own);
    },
  ).as('getOwnItems');
};

export const mockGetPublishedItems = (items) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(
          buildGetPublicItemsWithTag({
            tagId: ITEM_PUBLISHED_TAG.id,
          }),
        )}$`,
      ),
    },
    (req) => {
      req.reply(items);
    },
  ).as('getPublishedItems');
};

export const mockGetAvatar = (members, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/members/avatars/${ID_FORMAT}\\?size\\=small`,
      ),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      const [link, querystrings] = url.split('?');
      const id = link.slice(API_HOST.length).split('/')[3];
      const { size } = qs.parse(querystrings);

      const { thumbnails } = members.find(({ id: thisId }) => id === thisId);
      if (!thumbnails) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }

      return reply({
        fixture: `${thumbnails}/${size}`,
        headers: { 'content-type': THUMBNAIL_EXTENSION },
      });
    },
  ).as('downloadAvatar');
};

export const mockGetItem = (items, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/items/${ID_FORMAT}$`,
      ),
    },
    ({ url, reply }) => {
      const paras = url.slice(API_HOST.length).split('/')[2].split('?');
      const itemId = paras[0];
      const item = getItemById(items, itemId);

      // item does not exist in db
      if (!item) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      return reply({
        body: item,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getItem');
};

export const mockGetItemThumbnail = (items, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${ITEMS_ROUTE}/thumbnails/${ID_FORMAT}\\?size\\=medium`,
      ),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST });
      }

      const [link, querystrings] = url.split('?');
      const id = link.slice(API_HOST.length).split('/')[3];
      const { size } = qs.parse(querystrings);

      const thumbnails = items.find(({ id: thisId }) => id === thisId)
        ?.thumbnails;
      if (!thumbnails) {
        return reply({ statusCode: StatusCodes.NOT_FOUND });
      }
      return reply({
        fixture: `${thumbnails}/${size}`,
        headers: { 'content-type': THUMBNAIL_EXTENSION },
      });
    },
  ).as('downloadItemThumbnail');
};

export const mockGetChildren = ({ items, currentMember }) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetChildrenRoute(ID_FORMAT)}`),
    },
    ({ url, reply }) => {
      const id = url.slice(API_HOST.length).split('/')[2];
      const item = getItemById(items, id);

      if (!checkMembership({ item, currentMember })) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      const children = items.filter(isChild(id));
      return reply(children);
    },
  ).as('getChildren');
};

export const mockGetPublicChildren = (items) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetPublicChildrenRoute(ID_FORMAT)}`),
    },
    ({ url, reply }) => {
      const id = url.slice(API_HOST.length).split('/')[2];

      const children = items.filter(isChild(id));
      return reply(children);
    },
  ).as('getPublicChildren');
};

export const mockGetMember = (members) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetMember(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      const memberId = url.slice(API_HOST.length).split('/')[2];
      const member = getMemberById(members, memberId);

      // member does not exist in db
      if (!member) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: member,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getMember');
};

export const mockGetMembers = (members) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${API_HOST}/${buildGetMembersRoute([''])}`,
    },
    ({ url, reply }) => {
      let { id: memberIds } = qs.parse(url.slice(url.indexOf('?') + 1));
      if (typeof memberIds === 'string') {
        memberIds = [memberIds];
      }
      const allMembers = memberIds?.map((id) => getMemberById(members, id));
      // member does not exist in db
      if (!allMembers) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      return reply({
        body: allMembers,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getMembers');
};

export const mockSignInRedirection = () => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: `${AUTHENTICATION_HOST}/${buildSignInPath()}`,
    },
    ({ reply }) => {
      reply(redirectionReply);
    },
  ).as('signInRedirection');
};

export const mockSignOut = () => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(SIGN_OUT_ROUTE),
    },
    ({ reply }) => {
      reply(redirectionReply);
    },
  ).as('signOut');
};

export const mockGetCategoryTypes = (categoryTypes) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(GET_CATEGORY_TYPES_ROUTE)}$`,
      ),
    },
    ({ reply }) => {
      reply(categoryTypes);
    },
  ).as('getCategoryTypes');
};

export const mockGetCategories = (categories, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(buildGetCategoriesRoute())}`,
      ),
    },
    ({ reply }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST, body: null });
        return;
      }
      reply(categories);
    },
  ).as('getCategories');
};

export const mockGetItemCategories = (items, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/items/${ID_FORMAT}/categories`),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST });
      }
      const itemId = url.slice(API_HOST.length).split('/')[2];
      const result = items.find(({ id }) => id === itemId)?.categories || [];
      reply(result);
    },
  ).as('getItemCategories');
};

export const mockGetItemsInCategories = (items, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/p/${ITEMS_ROUTE}/with-categories?`),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST, body: null });
        return;
      }
      const queryCategories = url
        .slice(url.indexOf('?') + 1)
        .split('categoryId=')
        .slice(1);
      const result = items.filter(({ categories }) =>
        queryCategories.reduce(
          (total, queryCategory) =>
            total && categories?.includes(queryCategory),
          Boolean(categories),
        ),
      );
      reply(result);
    },
  ).as('getItemsInCategories');
};
