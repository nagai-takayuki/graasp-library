import Link from 'next/link';
import PropTypes from 'prop-types';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography, styled } from '@mui/material';

import { LIBRARY } from '@graasp/translations';

import { APP_AUTHOR } from '../../config/constants';
import {
  ERROR_MESSAGES,
  ERROR_UNEXPECTED_ERROR_CODE,
} from '../../config/messages';
import { HOME_ROUTE } from '../../config/routes';
import Seo from './Seo';

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'block',
  margin: 'auto',
  marginTop: theme.spacing(2),
}));

const Error = ({ code = ERROR_UNEXPECTED_ERROR_CODE }) => {
  const { t } = useTranslation();
  const message = ERROR_MESSAGES[code];

  return (
    <>
      <Seo
        title={t(LIBRARY.ERROR_TITLE)}
        description={t(message)}
        author={APP_AUTHOR}
      />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item textAlign="center">
          <Typography variant="h4" align="center">
            {t(message)}
          </Typography>
          <StyledLink href={HOME_ROUTE}>
            <Typography variant="subtitle1">
              {t(LIBRARY.ERROR_RETURN_TO_HOME)}
            </Typography>
          </StyledLink>
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
