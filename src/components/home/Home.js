import { makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  APP_AUTHOR,
  APP_DESCRIPTION,
  APP_NAME,
  RANGES,
} from '../../config/constants';
import { PUBLISHED_TAG_ID, NEXT_PUBLIC_GRAASPER_ID } from '../../config/env';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import Loader from '../common/Loader';
import Search from './Search';
import { QueryClientContext } from '../QueryClientContext';
import { PLACEHOLDER_COLLECTIONS } from '../../utils/collections';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '4vw',
  },
  root: {
    padding: theme.spacing(0.25, 0.5),
    margin: theme.spacing(12.5, 0),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(2.5),
    flex: 6,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: theme.spacing(0.5),
  },
  typographyMargin: {
    margin: theme.spacing(1.5, 0),
  },
}));

function Home() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [range, setRange] = useState(RANGES.ALL.value);
  const [keywords, setKeywords] = useState(null);
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
    {
      placeholderData: PLACEHOLDER_COLLECTIONS,
    },
  );

  const collectionsGraasper = collections?.filter(
    (collection) => collection.creator === NEXT_PUBLIC_GRAASPER_ID,
  );

  const { data: resultCollections } = hooks.useKeywordSearch(range, keywords);

  useEffect(() => {
    setSearchResults(resultCollections);
  }, [resultCollections]);

  const handleKeywordInput = (event) => {
    setSearchInput(event.target.value.trim().toLowerCase());
  };

  const handleClick = () => {
    const keywordArray = searchInput
      .split(' ')
      .map((keyword) => keyword.trim());
    if (range === 'title') {
      setKeywords(searchInput);
    } else {
      setKeywords(keywordArray.join('&'));
    }
  };

  const handleRangeChange = (event) => {
    setRange(event.target.value);
  };

  const renderResults = () => {
    if (!searchResults) {
      return null;
    }
    return (
      <>
        <Typography variant="h3" className={classes.typographyMargin}>
          {t('Search Results')}
        </Typography>
        {searchResults.size > 0 ? (
          <CollectionsGrid collections={searchResults} />
        ) : (
          <Typography variant="body1" className={classes.typographyMargin}>
            {t('No results found.')}
          </Typography>
        )}
      </>
    );
  };

  return (
    <>
      <Seo title={APP_NAME} description={APP_DESCRIPTION} author={APP_AUTHOR} />
      <div className={classes.wrapper}>
        <Typography variant="h3" align="center">
          {t('Browse Open Educational Resources')}
        </Typography>
        <Search
          handleSearch={handleKeywordInput}
          handleClick={handleClick}
          isLoading={isLoading}
          range={range}
          handleRangeChange={handleRangeChange}
        />
        {isLoading ? <Loader /> : renderResults()}
        <Typography variant="h3" className={classes.typographyMargin}>
          {t('Graasp Selection')}
        </Typography>
        <CollectionsGrid
          collections={collectionsGraasper}
          isLoading={isLoading}
        />
        <Typography variant="h3" className={classes.typographyMargin}>
          {t('Discover')}
        </Typography>
        <CollectionsGrid collections={collections} isLoading={isLoading} />
      </div>
    </>
  );
}

export default Home;
