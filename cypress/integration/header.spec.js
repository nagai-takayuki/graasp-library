import { HOME_ROUTE } from '../support/constants';

// describe('Home Page', () => {
//   beforeEach(() => {
//     cy.setUpApi();
//     cy.visit(HOME_ROUTE);
//   });

//   // check if title and headings are displayed correctly
//   it('display headings', () => {
//     cy.get('h3')
//       .first()
//       .should('have.text', 'Browse Open Educational Resources');

//     cy.get('div + h3').first().should('have.text', 'Graasp Selection');
//     cy.get('h5 + h3').last().should('have.text', 'Discover');
//   });

//   it('display collections', () => {
//     // verify 3 item cards are displayed
//     const itemGrids = cy.get(
//       '#__next > div.makeStyles-root-1 > div.makeStyles-wrapper-10 > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2',
//     );
//     itemGrids.children().should('have.length', 3);
//   });
// });

describe('header bar', () => {
  beforeEach(() => {
    cy.setUpApi();
    cy.visit(HOME_ROUTE);
  });

  it('click "all collections" then back', () => {
    cy.get('header > div > div > h6:nth-child(3)').click();
    cy.location('pathname').should('eq', '/all-collections');
    cy.get('main > h3').should('have.text', 'All Collections');
    cy.get('header > div > div > h6:nth-child(2)').click();
    cy.location('pathname').should('eq', '/');
  });

  it('click "my list" then back', () => {
    cy.get('header > div > div > h6:nth-child(4)').click();
    cy.location('pathname').should('eq', '/my-list');
    cy.get('main > h3:nth-child(1)').should('have.text', 'My Collections');
    cy.get('header > div > div > h6:nth-child(2)').click();
    cy.location('pathname').should('eq', '/');
  });
});
