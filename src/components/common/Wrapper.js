import React from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from '@sentry/react';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import { LoginModalProvider } from './LoginModalContext';
import { QueryClientProvider } from '../QueryClientContext';
import { SENTRY_FALLBACK_MESSAGE } from '../../config/constants';
import Header from '../layout/Header';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100%',
  },
});

function Wrapper({ dehydratedState, children }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <ErrorBoundary fallback={t(SENTRY_FALLBACK_MESSAGE)}>
      <div className={classes.root}>
        <QueryClientProvider dehydratedState={dehydratedState}>
          <LoginModalProvider>
            <Header />
            {children}
          </LoginModalProvider>
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
}

Wrapper.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
  children: PropTypes.element.isRequired,
};

export default Wrapper;
