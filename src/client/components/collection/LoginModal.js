import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from '../../config/routes';
import { openInNewTab } from '../../config/helpers';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const LoginModal = ({ open, setOpen }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    openInNewTab(SIGN_IN_ROUTE);
  };

  const handleSignUp = () => {
    openInNewTab(SIGN_UP_ROUTE);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('Login Required')}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            {t('In order to proceed, you need to login to Graasp.')}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignUp} color="primary">
            {t('Create an Account')}
          </Button>
          <Button
            autoFocus
            variant="contained"
            onClick={handleLogin}
            color="primary"
          >
            {t('Login')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

LoginModal.defaultProps = {};

export default LoginModal;