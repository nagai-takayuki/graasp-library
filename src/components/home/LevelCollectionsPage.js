import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';
import { ALL_COLLECTIONS_GRID_ID } from '../../config/selectors';

const LevelCollectionsPage = ({
  selectedLevel,
  selectedDiscipline,
  selectedLanguage,
  gridParams,
}) => {
  const { t } = useTranslation();
  const { hooks } = useContext(QueryClientContext);

  // join all selected categories by comma
  const categoryIds = [
    selectedDiscipline.join(','),
    selectedLevel.join(','),
    selectedLanguage.join(','),
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
      <CollectionsGrid
        id={ALL_COLLECTIONS_GRID_ID}
        collections={collections}
        isLoading={isLoading}
        sm={gridParams?.sm}
        md={gridParams?.md}
        lg={gridParams?.lg}
        xl={gridParams?.xl}
      />
    </>
  );
};

LevelCollectionsPage.propTypes = {
  selectedLevel: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedDiscipline: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedLanguage: PropTypes.arrayOf(PropTypes.string).isRequired,
  gridParams: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
  }).isRequired,
};

export default LevelCollectionsPage;
