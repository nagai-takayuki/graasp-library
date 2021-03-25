import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { HOME_ROUTE } from '../../config/routes';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'block',
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  content: {
    textAlign: 'center',
  },
}));

const Error = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Grid item className={classes.content}>
        <Typography variant="h4" align="center">
          {t('Sorry, this page was not found.')}
        </Typography>
        <Link className={classes.link} to={HOME_ROUTE}>
          <Typography variant="subtitle1">{t('Return to Home')}</Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Error;
