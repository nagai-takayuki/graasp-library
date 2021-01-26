import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import 'react-toastify/dist/ReactToastify.css';
import i18nConfig from '../config/i18n';
import App from './App';

const styles = {
  body: {
    margin: 0,
    padding: 0,
  },
  root: {
    flexGrow: 1,
    height: '100%',
  },
};

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey,
    background: {
      paper: '#fff',
    },
  },
  status: {
    danger: {
      background: orange,
      color: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ['SuisseIntl', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    fontSize: 12,
  },
});

theme = responsiveFontSizes(theme);

const Root = ({ classes }) => {
  useEffect(() => {
    document.body.className = classes.body;
  });

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <I18nextProvider i18n={i18nConfig}>
          <App />
          <ToastContainer />
        </I18nextProvider>
      </MuiThemeProvider>
    </div>
  );
};

Root.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

const StyledComponent = withStyles(styles)(Root);

export default StyledComponent;
