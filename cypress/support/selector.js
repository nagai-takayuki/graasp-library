export const SUBTITLE_SELECTOR = '#__next > div > div > div > main > h6';
export const ITEM_GRIDS_SELECTOR = '#__next > div > div > div > main > div';
export const buildItemInGridSelector = (index) =>
  `#__next > div > div > div > main > div > div:nth-child(${index})`;
export const SIDEMENU_HEADING_SELECTOR =
  '#__next > div > div > div > div > div > h5';
export const SIDEMENU_OPTION_SELECTOR =
  '#__next > div > div > div > div > ul:nth-child(6) > div > div > span';
export const CLEAR_SELECTION_SELECTOR =
  '#__next > div > div > div > div > button:nth-child(7)';
export const CATEGORY_BUTTON_SELECTOR =
  '#__next > div > div > div > div > ul:nth-child(6) > div';
export const OPEN_MENU_BUTTON_SELECTOR =
  '#__next > div > div > div > main > button:nth-child(1)';
export const CLOSE_MENU_BUTTON_SELECTOR =
  '#__next > div > div > div > div > div > button:nth-child(2)';
export const HEADER_ALL_COLLECTION_SELECTOR =
  'header > div > div > h6:nth-child(3)';
export const TITLE_TEXT_SELECTOR = 'main > h3:nth-child(3)';
export const MY_LIST_TITLE_TEXT_SELECTOR = 'main > h3:nth-child(1)';
export const HEADER_GRAASP_EXPLORER_SELECTOR =
  'header > div > div > h6:nth-child(2)';
export const HEADER_MY_LIST_SELECTOR = 'header > div > div > h6:nth-child(4)';
export const DISCOVER_GRIDS_SELECTOR = '#__next > div > div > div:nth-child(6)';
export const ITEM_SUMMARY_TITLE_SELECTOR = 'div > div > div > h1';
export const ITEM_SUMMARY_CHILDREN_GRIDS_SELECTOR =
  '#__next > div > div > div:nth-child(3) > div:nth-child(2)';
