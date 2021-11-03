import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { HOME_ROUTE } from '../../config/routes';
import {
  ERROR_MESSAGES,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import Seo from './Seo';
import { APP_AUTHOR } from '../../config/constants';

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

const Error = ({ code = ERROR_UNEXPECTED_ERROR_CODE }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const message = ERROR_MESSAGES[code];

  return (
    <>
      <Seo title={t('Error')} description={t(message)} author={APP_AUTHOR} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item className={classes.content}>
          <Typography variant="h4" align="center">
            {t(message)}
          </Typography>
          <Link className={classes.link} href={HOME_ROUTE}>
            <Typography variant="subtitle1">{t('Return to Home')}</Typography>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

Error.propTypes = {
  code: PropTypes.string,
};

Error.defaultProps = {
  code: null,
};

export default Error;
