import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { APP_AUTHOR, APP_DESCRIPTION, APP_NAME } from '../../config/constants';
import CollectionsGrid from '../collection/CollectionsGrid';
import { CollectionContext } from '../CollectionProvider';
import Seo from '../common/Seo';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(5),
  },
}));

function Home() {
  const { t } = useTranslation();
  const { collections } = useContext(CollectionContext);
  const classes = useStyles();
  return (
    <>
      <Seo title={APP_NAME} description={APP_DESCRIPTION} author={APP_AUTHOR} />
      <div className={classes.wrapper}>
        <Typography variant="h2">{t('Home')}</Typography>
        <CollectionsGrid collections={collections} />
      </div>
    </>
  );
}

export default Home;
