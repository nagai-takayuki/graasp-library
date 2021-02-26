import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getAvatar } from '../../utils/layout';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(),
    display: 'flex',
  },
  authorName: {
    marginLeft: theme.spacing(),
  },
}));

function Authorship({ author, contributors }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { image, name: authorName } = author;

  const authorAvatar = getAvatar(image);

  return (
    // wrapper div is necessary for grid to apply
    <div>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            {t('Author')}
          </Typography>
          <Grid container alignItems="center" justify="flex-start">
            <Grid item>
              <Avatar alt={authorName} src={authorAvatar} />
            </Grid>
            <Grid item className={classes.authorName}>
              <Typography variant="body1">{authorName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {Boolean(contributors.length) && (
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" gutterBottom>
              {t('Contributors')}
            </Typography>
            <AvatarGroup max={8}>
              {contributors.map((contributor) => {
                const {
                  name: contributorName,
                  image: contributorAvatar,
                } = contributor;
                const avatar = getAvatar(contributorAvatar);
                return <Avatar alt={contributorName} src={avatar} />;
              })}
            </AvatarGroup>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

Authorship.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.shape({}),
  }).isRequired,
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.shape({}),
    }),
  ),
};

Authorship.defaultProps = {
  contributors: [],
};

export default Authorship;
