import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item';
import ItemsHeader from './ItemsHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Items({ items }) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ItemsHeader />
      {!items.length ? (
        <div className="Main">
          <Typography variant="h5" color="inherit">
            {t('This collection is empty.')}
          </Typography>
        </div>
      ) : (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
              <Item item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      description: PropTypes.string,
      viewLink: PropTypes.func,
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

Items.defaultProps = {
  items: [],
};

export default Items;
