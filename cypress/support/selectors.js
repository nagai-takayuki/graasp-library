import * as ID from '../../src/config/selectors';

export const TITLE_TEXT_SELECTOR = `#${ID.TITLE_TEXT_ID}`;
export const SUBTITLE_TEXT_SELECTOR = `#${ID.SUBTITLE_TEXT_ID}`;
export const SIDEMENU_HEADING_SELECTOR = `#${ID.SIDEMENU_HEADING_ID}`;
export const ITEM_GRIDS_SELECTOR = `#${ID.COLLECTIONS_GRID_ID}`;
export const buildEducationLevelOptionSelector = (index) =>
  `#${ID.buildEducationLevelOptionId(index)}`;
export const buildItemInGridSelector = (index) =>
  `#${ID.buildCollectionCardGridId(ID.COLLECTIONS_GRID_ID, index)}`;
export const CLEAR_EDUCATION_LEVEL_SELECTION_SELECTOR = `#${ID.CLEAR_EDUCATION_LEVEL_SELECTION_ID}`;
export const OPEN_MENU_BUTTON_SELECTOR = `#${ID.OPEN_MENU_BUTTON_ID}`;
export const CLOSE_MENU_BUTTON_SELECTOR = `#${ID.CLOSE_MENU_BUTTON_ID}`;
export const HEADER_ALL_COLLECTION_SELECTOR = `#${ID.HEADER_ALL_COLLECTIONS_ID}`;
export const HEADER_GRAASP_EXPLORER_SELECTOR = `#${ID.HEADER_GRAASP_EXPLORER_ID}`;
export const HEADER_MY_LIST_SELECTOR = `#${ID.HEADER_MY_LIST_ID}`;
export const ITEM_SUMMARY_TITLE_SELECTOR = `#${ID.ITEM_SUMMARY_TITLE_ID}`;
export const CHILDREN_ITEMS_GRID_SELECTOR = `#${ID.CHILDREN_ITEMS_GRID_ID}`;
