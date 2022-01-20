import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';

const LevelCollectionsPage = ({ selectedLevel, selectedDiscipline }) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);

  // join all selected categories by comma
  const categoryIds = [
    selectedDiscipline.join(','),
    selectedLevel.join(','),
  ].filter(Boolean);
  const { data: collections, isLoading } =
    hooks.useItemsInCategories(categoryIds);
  const count = collections?.size || 0;

  return (
    <>
      <Typography variant="h3" align="center">
        {t('Collections in Selected Categories')}
      </Typography>
      <Typography variant="subtitle2" aligh="left">
        {t('collectionsCount', { count })}
      </Typography>
      <CollectionsGrid collections={collections} isLoading={isLoading} />
    </>
  );
};

LevelCollectionsPage.propTypes = {
  selectedLevel: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDiscipline: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LevelCollectionsPage;
