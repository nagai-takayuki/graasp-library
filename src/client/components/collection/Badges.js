import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import {
  Favorite,
  Visibility,
  Email,
  Facebook,
  Twitter,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import { openInNewTab } from '../../config/helpers';

const useStyles = makeStyles((theme) => ({
  badges: {
    '& > *': {
      marginRight: theme.spacing(3),
    },
  },
  root: {
    marginBottom: theme.spacing(),
  },
  cell: {
    display: 'flex',
  },
}));

function Badges({ views, likes, name }) {
  const classes = useStyles();
  const [pageLocation, setPageLocation] = useState(null);

  useEffect(() => {
    setPageLocation(window?.location.href);
  });

  const shareOnTwitter = () => {
    const textToShare = `${name} ${pageLocation}`;
    openInNewTab(`https://twitter.com/intent/tweet?text=${textToShare}`);
  };

  const shareOnFacebook = () => {
    const link = pageLocation;
    openInNewTab(`https://www.facebook.com/sharer/sharer.php?u=${link}`);
  };

  const subject = name;
  const message = pageLocation;
  const mailString = `mailto:?subject=${subject}&body=${message}`;

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={6}
        className={classes.cell}
        justify="flex-start"
        alignItems="center"
      >
        <div className={classes.badges}>
          <Badge badgeContent={likes} color="secondary" max={999}>
            <Favorite color="primary" fontSize="large" />
          </Badge>
          <Badge badgeContent={views} color="secondary" max={999}>
            <Visibility color="primary" fontSize="large" />
          </Badge>
        </div>
      </Grid>
      <Grid
        item
        xs={6}
        className={classes.cell}
        justify="flex-end"
        alignItems="center"
      >
        <IconButton color="primary" onClick={shareOnFacebook}>
          <Facebook fontSize="large" />
        </IconButton>
        <IconButton color="primary" onClick={shareOnTwitter}>
          <Twitter fontSize="large" />
        </IconButton>
        <a href={mailString}>
          <IconButton color="primary">
            <Email fontSize="large" />
          </IconButton>
        </a>
      </Grid>
    </Grid>
  );
}

Badges.propTypes = {
  views: PropTypes.number,
  likes: PropTypes.number,
  name: PropTypes.string.isRequired,
};

Badges.defaultProps = {
  views: 0,
  likes: 0,
};

export default Badges;
