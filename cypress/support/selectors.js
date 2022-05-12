import * as ID from '../../src/config/selectors';

export const TITLE_TEXT_SELECTOR = `#${ID.TITLE_TEXT_ID}`;
export const GRAASP_SELECTION_TITLE_SELECTOR = `#${ID.GRAASP_SELECTION_TITLE_ID}`;
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
export const HEADER_ALL_COLLECTIONS_SELECTOR = `#${ID.HEADER_ALL_COLLECTIONS_ID}`;
export const HEADER_GRAASP_EXPLORER_SELECTOR = `#${ID.HEADER_GRAASP_EXPLORER_ID}`;
export const HEADER_MY_LIST_SELECTOR = `#${ID.HEADER_MY_LIST_ID}`;
export const ITEM_SUMMARY_TITLE_SELECTOR = `#${ID.ITEM_SUMMARY_TITLE_ID}`;
export const CHILDREN_ITEMS_GRID_SELECTOR = `#${ID.CHILDREN_ITEMS_GRID_ID}`;
export const DISCOVER_SECTION_TITLE_SELECTOR = `#${ID.DISCOVER_SECTION_TITLE_ID}`;
export const SUMMARY_AUTHOR_CONTAINER_ID = `summaryAuthorContainer`;
export const buildContributorId = (id) => `contributor-${id}`;
export const SUMMARY_CATEGORIES_CONTAINER_ID = 'summaryCategoriesContainer';
export const SUMMARY_TAGS_CONTAINER_ID = 'summaryTagsContainer';
export const SUMMARY_CC_LICENSE_CONTAINER_ID = 'summaryCCLicenseContainer';
export const HOME_SEARCH_ID = 'homeSearch';
export const HOME_SEARCH_BUTTON_ID = 'homeSearchButton';
export const ALL_COLLECTIONS_GRID_ID = 'allCollectionsGrid';
export const SEARCH_RESULTS_GRID_ID = 'searchResultsGrid';
export const buildSearchRangeOptionId = (value) => `searchRangeOption-${value}`;
export const MY_FAVORITES_COLLECTIONS_GRID = `#${ID.MY_FAVORITES_COLLECTIONS_ID}`; 
export const MY_LIKED_COLLECTIONS_GRID = `#${ID.MY_LIKES_COLLECTIONS_ID}`; 
