import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Typography, Toolbar, withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as Logo } from '../../resources/logo.svg';

class Header extends Component {
  static styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    logo: {
      height: '48px',
      marginRight: theme.spacing(2),
    },
  });

  static propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string,
      grow: PropTypes.string,
      logo: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {};

  render() {
    const { t, classes } = this.props;
    return (
      <header>
        <AppBar position="static">
          <Toolbar>
            <Logo className={classes.logo} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {t('Explore')}
            </Typography>
            <IconButton
              edge="end"
              aria-label="Account"
              aria-haspopup="true"
              onClick={() => {}}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

const TranslatedComponent = withTranslation()(Header);

export default withStyles(Header.styles)(TranslatedComponent);
