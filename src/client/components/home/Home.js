import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_AUTHOR, APP_DESCRIPTION, APP_NAME } from '../../config/constants';
import CollectionsGrid from '../collection/CollectionsGrid';
import Seo from '../common/Seo';
import Loader from '../common/Loader';
import Search from './Search';
import { QueryClientContext } from '../QueryClientContext';
import runtimeConfig from '../../../api/env';

const { PUBLISHED_TAG_ID } = runtimeConfig;

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
  const { hooks } = useContext(QueryClientContext);
  const { data: collections, isLoading } = hooks.usePublicItemsWithTag(
    PUBLISHED_TAG_ID,
  );
  const { data: members, isLoading: isMemberLoading } = hooks.useMembers(
    collections?.map(({ creator }) => creator),
  );

  if (isLoading || isMemberLoading) {
    return 'Loading...';
  }

  const handleSearch = (event) => {
    const query = event.target.value.trim().toLowerCase();
    if (query.length > 0) {
      setSearchResults(
        collections.filter(
          (collection) =>
            collection.name.toLowerCase().includes(query) ||
            members
              ?.find(({ id }) => collection.creator === id)
              ?.name.toLowerCase()
              .includes(query),
        ),
      );
    }
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
          {t('Graasp Collections Directory')}
        </Typography>
        <Search handleSearch={handleSearch} isLoading={isLoading} />
        {isLoading ? <Loader /> : renderResults()}
        <Typography variant="h3" className={classes.typographyMargin}>
          {t('Discover')}
        </Typography>
        <CollectionsGrid collections={collections} isLoading={isLoading} />
      </div>
    </>
  );
}

export default Home;
