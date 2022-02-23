import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import truncate from 'lodash.truncate';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';
import { MUTATION_KEYS } from '@graasp/query-client';
import CardMedia from '../common/CardMediaComponent';
import { QueryClientContext } from '../QueryClientContext';
import Authorship from './Authorship';
import Badges from './Badges';
import {
  MAX_COLLECTION_NAME_LENGTH,
  THUMBNAIL_SIZES,
} from '../../config/constants';
import { ITEM_SUMMARY_TITLE_ID } from '../../config/selectors';

const { ItemFlagDialog, FlagItemButton, FavoriteButton, LikeButton } = {
  ItemFlagDialog: dynamic(
    () => import('@graasp/ui').then((mod) => mod.ItemFlagDialog),
    { ssr: false },
  ),
  FlagItemButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.FlagItemButton),
    { ssr: false },
  ),
  FavoriteButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.FavoriteButton),
    { ssr: false },
  ),
  LikeButton: dynamic(
    () => import('@graasp/ui').then((mod) => mod.LikeButton),
    { ssr: false },
  ),
};

const useStyles = makeStyles((theme) => ({
  centeredGridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    marginRight: theme.spacing(2),
  },
  image: {
    minHeight: '350px !important',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: '4em',
  },
  reportButton: {
    display: 'flex',
  },
}));

function Summary({
  itemId,
  name,
  creator,
  description,
  tags,
  contributors,
  likes,
  views,
  isLoading,
}) {
  const truncatedName = truncate(name, {
    length: MAX_COLLECTION_NAME_LENGTH,
    separator: /,? +/,
  });
  const classes = useStyles();
  const { t } = useTranslation();
  const { hooks, useMutation } = useContext(QueryClientContext);
  const { data: categories } = hooks.useItemCategories(itemId);
  const { data: allCategories } = hooks.useCategories();
  const categoriesDisplayed = allCategories?.filter((category) =>
    categories?.map((entry) => entry.categoryId).includes(category.id),
  );
  const { data: member } = hooks.useCurrentMember();
  const { data: likedItems } = hooks.useLikedItems(member?.get('id'));

  const { mutate: postFlagItem } = useMutation(MUTATION_KEYS.POST_ITEM_FLAG);
  const { mutate: updateFavoriteItem } = useMutation(MUTATION_KEYS.EDIT_MEMBER);
  const { mutate: postItemLike } = useMutation(MUTATION_KEYS.POST_ITEM_LIKE);
  const { mutate: deleteItemLike } = useMutation(
    MUTATION_KEYS.DELETE_ITEM_LIKE,
  );

  const [open, setOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(false);

  const { data: flags } = hooks.useFlags();

  const isFavorite = member?.get('extra')?.favoriteItems?.includes(itemId);

  const likeEntry = likedItems?.find((itemLike) => itemLike?.itemId === itemId);

  const onFlag = () => {
    postFlagItem({
      flagId: selectedFlag.id,
      itemId,
    });
    setOpen(false);
  };

  const handleFavorite = () => {
    updateFavoriteItem({
      id: member.get('id'),
      extra: {
        favoriteItems: member?.get('extra').favoriteItems
          ? member.get('extra').favoriteItems.concat([itemId])
          : [itemId],
      },
    });
  };

  const handleUnfavorite = () => {
    updateFavoriteItem({
      id: member.get('id'),
      extra: {
        favoriteItems: member
          ?.get('extra')
          .favoriteItems?.filter((id) => id !== itemId),
      },
    });
  };

  const handleLike = () => {
    postItemLike({
      itemId,
      memberId: member.get('id'),
    });
  };

  const handleUnlike = () => {
    deleteItemLike({
      id: likeEntry?.id,
      itemId,
      memberId: member.get('id'),
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item sm={12} md={4} className={classes.centeredGridItem}>
          <Card className={classes.card}>
            {isLoading ? (
              <Skeleton variant="rect" width="100%">
                <CardMedia
                  itemId={itemId}
                  name={name}
                  className={classes.image}
                />
              </Skeleton>
            ) : (
              <CardMedia
                itemId={itemId}
                name={name}
                className={classes.image}
                size={THUMBNAIL_SIZES.ORIGINAL}
              />
            )}
          </Card>
        </Grid>
        <Grid item sm={12} md={8}>
          <Grid
            container
            spacing={0}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h1"
                gutterBottom
                className={classes.title}
                id={ITEM_SUMMARY_TITLE_ID}
              >
                {truncatedName}
              </Typography>
            </Grid>
            <Grid item className={classes.reportButton}>
              <FavoriteButton
                color="primary"
                className={classes.favoriteButton}
                isFavorite={isFavorite}
                handleFavorite={handleFavorite}
                handleUnfavorite={handleUnfavorite}
              />
              <LikeButton
                color="primary"
                className={classes.likeButton}
                isLiked={Boolean(likeEntry)}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
              />
              <FlagItemButton setOpen={setOpen} />
            </Grid>
          </Grid>
          <Badges
            name={name}
            views={views}
            likes={likes}
            description={description}
          />
          <Typography variant="body1" gutterBottom component="div">
            {isLoading ? (
              <Skeleton />
            ) : (
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </Typography>
          <Authorship
            itemId={itemId}
            author={creator}
            contributors={contributors}
            isLoading={isLoading}
          />
          <ItemFlagDialog
            flags={flags}
            onFlag={onFlag}
            open={open}
            setOpen={setOpen}
            selectedFlag={selectedFlag}
            setSelectedFlag={setSelectedFlag}
          />
          {Boolean(categories?.size) && (
            <>
              <Typography variant="h6">{t('Category')}</Typography>
              {categoriesDisplayed?.map((entry) => (
                <Chip label={t(entry.name)} />
              ))}
            </>
          )}
          {Boolean(tags?.length) && (
            <>
              <Typography variant="h6">{t('Tags')}</Typography>
              {tags?.map((text) => (
                <Chip label={text} />
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

Summary.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  creator: PropTypes.instanceOf(Map),
  contributors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ),
  likes: PropTypes.number,
  views: PropTypes.number,
  rating: PropTypes.shape({
    value: PropTypes.number,
    count: PropTypes.number,
  }),
  isLoading: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
};

Summary.defaultProps = {
  name: PropTypes.string,
  description: PropTypes.string,
  tags: [],
  contributors: [],
  views: 0,
  likes: 0,
  rating: {
    count: 0,
    value: 0,
  },
  creator: null,
};

export default Summary;
