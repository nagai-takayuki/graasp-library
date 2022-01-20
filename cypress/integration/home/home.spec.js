import { HOME_ROUTE } from '../../../src/config/routes';
import { GRAASPER_ITEMS, PUBLISHED_ITEMS } from '../../fixtures/items';
import { buildPublicAndPrivateEnvironments } from '../../fixtures/environment';
import {
  DISCOVER_SECTION_TITLE_SELECTOR,
  GRAASP_SELECTION_TITLE_SELECTOR,
  ITEM_GRIDS_SELECTOR,
  TITLE_TEXT_SELECTOR,
} from '../../support/selectors';
import { getRootPublishedItems } from '../../support/utils';
import { ITEM_PUBLISHED_TAG } from '../../fixtures/itemTags';

describe('Home Page', () => {
  buildPublicAndPrivateEnvironments().forEach((environment) => {
    describe(`Home Layout for ${environment.currentMember.name}`, () => {
      // check if title and headings are displayed correctly
      it('display headings & collections', () => {
        cy.setUpApi(environment);
        cy.visit(HOME_ROUTE);

        cy.get(TITLE_TEXT_SELECTOR).should(
          'have.text',
          'Browse Open Educational Resources',
        );
        cy.get(DISCOVER_SECTION_TITLE_SELECTOR)
          .last()
          .should('have.text', 'Discover');

        // verify item cards are displayed
        cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
          expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
          cy.get(ITEM_GRIDS_SELECTOR)
            .children()
            .should(
              'have.length',
              getRootPublishedItems(PUBLISHED_ITEMS).length,
            );
        });
      });

      describe('Graasper items', () => {
        it('No graasper items to show', () => {
          cy.setUpApi(environment);
          cy.visit(HOME_ROUTE);

          // section should not be displayed
          cy.wait('@getPublicItemsWithTags').then(({ request: { url } }) => {
            expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
            cy.get(GRAASP_SELECTION_TITLE_SELECTOR).should('not.exist');
          });
        });
        it('Display graasper items', () => {
          const graasperEnvironment = JSON.parse(JSON.stringify(environment));
          graasperEnvironment.items = [
            ...GRAASPER_ITEMS,
            ...(graasperEnvironment.items ?? []),
          ];

          cy.setUpApi(graasperEnvironment);
          cy.visit(HOME_ROUTE);

          // verify graasper cards are displayed
          cy.wait('@getPublicItemsWithTags').then(
            ({ request: { url }, response: { body } }) => {
              expect(url).to.contain(ITEM_PUBLISHED_TAG.id);
              cy.get(GRAASP_SELECTION_TITLE_SELECTOR).should(
                'have.text',
                'Graasp Selection',
              );

              cy.get(ITEM_GRIDS_SELECTOR)
                .children()
                .should('have.length', body.length);
            },
          );
        });
      });
    });
  });
});
