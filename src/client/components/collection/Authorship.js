import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Map } from 'immutable';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getAvatar } from '../../utils/layout';
import Contributors from './Contributors';
import { QueryClientContext } from '../QueryClientContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(),
    display: 'flex',
  },
  authorName: {
    marginLeft: theme.spacing(),
  },
}));

const Authorship = ({ itemId, author, isLoading }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { hooks } = useContext(QueryClientContext);
  const { data: item, isLoading: isLoadingItem } = hooks.useItem(itemId, {
    withMemberships: true,
  });
  const memberIds = [
    ...new Set(
      item
        ?.get('itemMemberships')
        ?.filter(
          ({ permission, memberId }) =>
            (permission === 'read' || permission === 'admin') &&
            memberId !== author?.get('id'),
        )
        ?.map(({ memberId }) => memberId),
    ),
  ];
  const {
    data: contributors,
    isLoading: isLoadingContributors,
  } = hooks.useMembers(memberIds);

  const isAnyLoading = isLoadingItem || isLoading || isLoadingContributors;

  if (isAnyLoading) {
    return <Skeleton variant="rectangular" height={50} />;
  }

  if (!author && !isLoading) {
    return null;
  }

  const authorAvatar = getAvatar(author?.get('image'));
  const authorName = author?.get('name');

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
              {isLoading ? (
                <Skeleton>
                  <Avatar />
                </Skeleton>
              ) : (
                <Avatar alt={authorName} src={authorAvatar} />
              )}
            </Grid>
            <Grid item className={classes.authorName}>
              <Typography variant="body1">{authorName}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Contributors contributors={contributors} />
        </Grid>
      </Grid>
    </div>
  );
};

Authorship.propTypes = {
  author: PropTypes.instanceOf(Map),
  isLoading: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
};

Authorship.defaultProps = {
  author: null,
};

export default Authorship;
