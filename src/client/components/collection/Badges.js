import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
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
import {
  MAIL_BREAK_LINE,
  TWITTER_MESSAGE_MAX_LENGTH,
} from '../../config/constants';
import { removeTagsFromString } from '../../utils/text';

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

function Badges({ views, likes, name, description }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [pageLocation, setPageLocation] = useState(null);

  const parsedDescription = removeTagsFromString(description);

  useEffect(() => {
    setPageLocation(window?.location.href);
  });

  const shareOnTwitter = () => {
    const message = _.truncate(
      `${t('Check out this collection on Graasp', {
        name,
      })} ${pageLocation} : ${parsedDescription}`,
      { length: TWITTER_MESSAGE_MAX_LENGTH },
    );
    openInNewTab(`https://twitter.com/intent/tweet?text=${message}`);
  };

  const shareOnFacebook = () => {
    const link = pageLocation;
    openInNewTab(`https://www.facebook.com/sharer/sharer.php?u=${link}`);
  };

  const subject = `${t('Check out this collection on Graasp', { name })}`;
  const message = `${t('Check out this collection on Graasp', {
    name,
  })} ${pageLocation}${MAIL_BREAK_LINE}${MAIL_BREAK_LINE}${parsedDescription}`;
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
  description: PropTypes.string.isRequired,
};

Badges.defaultProps = {
  views: 0,
  likes: 0,
};

export default Badges;
