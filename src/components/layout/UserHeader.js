import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { AccountCircle } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Typography } from '@material-ui/core';
import { LoginModalContext } from '../common/LoginModalContext';
import { QueryClientContext } from '../QueryClientContext';

const useStyles = makeStyles((theme) => ({
  username: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    color: theme.palette.primary.main,
    backgroundColor: grey[200],
  },
}));

const UserHeader = () => {
  const { hooks } = useContext(QueryClientContext);
  const { data: user, isLoading } = hooks.useCurrentMember();
  const classes = useStyles();
  const { setOpen: openLoginModal } = useContext(LoginModalContext);

  const onSignedOutIconClick = () => {
    openLoginModal(true);
  };

  if (isLoading || user.isEmpty()) {
    return (
      <IconButton
        edge="end"
        aria-label="Account"
        aria-haspopup="true"
        onClick={onSignedOutIconClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    );
  }

  const username = user?.get('name');
  // necessary broken image to display avatar with letter
  const imageLink = '/broken-image.jpg';
  return (
    <>
      <Avatar alt={username} src={imageLink} className={classes.avatar} />
      <Typography className={classes.username} variant="body2">
        {username}
      </Typography>
    </>
  );
};

export default UserHeader;
