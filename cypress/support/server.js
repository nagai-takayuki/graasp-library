import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import qs from 'querystring';
import { API_ROUTES } from '@graasp/query-client';
import { MEMBERS } from '../fixtures/members';
import {
  DEFAULT_GET,
  DEFAULT_POST,
  ID_FORMAT,
  parseStringToRegExp,
  getItemById,
  getParentsIdsFromPath,
  isChild,
  isRootItem,
  transformIdForPath,
  getMemberById,
} from './utils';
import { ITEM_PUBLIC_TAG, ITEM_PUBLISHED_TAG } from '../fixtures/itemTags';

const {
  buildCopyItemRoute,
  buildGetPublicItemsWithTag,
  buildGetChildrenRoute,
  buildGetPublicChildrenRoute,
  buildGetItemRoute,
  GET_OWN_ITEMS_ROUTE,
  buildGetMember,
  ITEMS_ROUTE,
  GET_CURRENT_MEMBER_ROUTE,
  buildSignInPath,
  SIGN_OUT_ROUTE,
  buildGetMembersRoute,
  GET_CATEGORY_TYPES_ROUTE,
  buildGetCategoriesRoute,
  buildGetItemCategoriesRoute,
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

export const mockGetItem = ({ items, currentMember }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${buildGetItemRoute(ID_FORMAT)}$`),
    },
    ({ url, reply }) => {
      const itemId = url.slice(API_HOST.length).split('/')[2];
      const item = getItemById(items, itemId);

      // item does not exist in db
      if (!item) {
        return reply({
          statusCode: StatusCodes.NOT_FOUND,
        });
      }

      if (shouldThrowError || !checkMembership({ item, currentMember })) {
        return reply({ statusCode: StatusCodes.UNAUTHORIZED, body: null });
      }

      return reply({
        body: item,
        statusCode: StatusCodes.OK,
      });
    },
  ).as('getItem');
};

export const mockGetPublicItems = (items) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(
          buildGetPublicItemsWithTag({
            tagId: ITEM_PUBLISHED_TAG.id,
            withMemberships: true,
          }),
        )}$`,
      ),
    },
    (req) => {
      req.reply(items);
    },
  ).as('getPublicItems');
};

export const mockGetItems = ({ items, currentMember }, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_GET.method,
      url: new RegExp(`${API_HOST}/${ITEMS_ROUTE}\\?id\\=`),
    },
    ({ url, reply }) => {
      const { id: itemIds } = qs.parse(url.slice(url.indexOf('?') + 1));
      return reply(
        itemIds.map((id) => {
          const item = getItemById(items, id);

          // mock membership
          const creator = item?.creator;
          const haveMembership =
            creator === currentMember.id ||
            item?.memberships?.find(
              ({ memberId }) => memberId === currentMember.id,
            );
          if (shouldThrowError || !haveMembership) {
            return { statusCode: StatusCodes.UNAUTHORIZED, body: null };
          }

          return (
            item || {
              statusCode: StatusCodes.NOT_FOUND,
            }
          );
        }),
      );
    },
  ).as('getItems');
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

export const mockCopyItem = (items, shouldThrowError) => {
  cy.intercept(
    {
      method: DEFAULT_POST.method,
      url: new RegExp(`${API_HOST}/${buildCopyItemRoute(ID_FORMAT)}`),
    },
    ({ url, reply, body }) => {
      if (shouldThrowError) {
        return reply({ statusCode: StatusCodes.BAD_REQUEST, body: null });
      }

      const id = url.slice(API_HOST.length).split('/')[2];
      const item = getItemById(items, id);
      const newId = uuidv4();
      let newItem = null;
      // actually copy
      let path = transformIdForPath(newId);
      if (body.parentId) {
        const parentItem = getItemById(items, body.parentId);
        path = `${parentItem.path}.${path}`;
      }
      newItem = { ...item, id: newId, path };
      items.push(newItem);
      // todo: do for all children
      return reply({
        statusCode: StatusCodes.OK,
        body: newItem,
      });
    },
  ).as('copyItem');
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
      url: new RegExp(
        `${API_HOST}/${parseStringToRegExp(
          buildGetItemCategoriesRoute(items[0]?.id),
        )}`,
      ),
    },
    ({ reply, url }) => {
      if (shouldThrowError) {
        reply({ statusCode: StatusCodes.BAD_REQUEST, body: null });
        return;
      }
      const itemId = url.slice(API_HOST.length).split('/')[2];
      const result = items.find(({ id }) => id === itemId)?.categories || [];
      reply(result);
    },
  ).as('getItemCategories');
};
