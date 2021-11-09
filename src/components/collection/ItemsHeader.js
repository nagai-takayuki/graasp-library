import { Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Info } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cell: {
    display: 'flex',
  },
  root: {
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
}));

function ItemsHeader() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" color="inherit" className={classes.cell}>
            {t('Items')}
          </Typography>
        </Grid>
        <Grid item className={classes.cell}>
          <Tooltip title={t('These are the items in this collection.')}>
            <Info color="primary" />
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

export default ItemsHeader;
