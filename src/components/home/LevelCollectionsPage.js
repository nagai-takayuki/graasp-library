import { makeStyles, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import CollectionsGrid from '../collection/CollectionsGrid';
import { QueryClientContext } from '../QueryClientContext';

const useStyles = makeStyles((theme) => ({
  typographyMargin: {
    margin: theme.spacing(1.5, 0),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

const LevelCollectionsPage = ({ selectedOptions }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { hooks } = useContext(QueryClientContext);

  // get all categories
  const { data: allCategories } = hooks.useCategories();

  // get category map (to map between category id and name)
  const categoriesMap = new Map(
    allCategories?.map((entry) => [entry.name, entry.id]),
  );

  const categories = selectedOptions?.filter((entry) => entry);
  const categoryIds = categories?.map((entry) => categoriesMap?.get(entry));
  const { data: collections, isLoading } = hooks.useItemsInCategories(
    categoryIds,
  );

  return (
    <>
      <Typography variant="h3" align="center">
        {t('Collections in ')}
        {
          t(categories) // splited deliberately to avoid translation error
        }
      </Typography>
      <CollectionsGrid collections={collections} isLoading={isLoading} />
      <Divider className={classes.divider} />
    </>
  );
};

LevelCollectionsPage.propTypes = {
  selectedOptions: PropTypes.arrayOf(String).isRequired,
};

export default LevelCollectionsPage;
