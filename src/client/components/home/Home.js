import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CollectionsGrid from '../collection/CollectionsGrid';
import { CollectionContext } from '../CollectionProvider';

function Home() {
  const { t } = useTranslation();
  const { collections } = useContext(CollectionContext);
  return (
    <div>
      <Typography variant="h2">{t('Home')}</Typography>
      <CollectionsGrid collections={collections} />
    </div>
  );
}

export default Home;
