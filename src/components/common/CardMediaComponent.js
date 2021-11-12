import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';
import { QueryClientContext } from '../QueryClientContext';
import { DEFAULT_ITEM_IMAGE_PATH } from '../../config/constants';

const CardMediaComponent = ({ className, name, link, itemId }) => {
  const useStyles = makeStyles(() => ({
    media: {
      minHeight: 200,
      // necessary to trigger content height 100%
      height: 0,
      '&:hover': {
        cursor: link ? 'pointer' : 'mouse',
      },
    },
  }));
  const { hooks } = useContext(QueryClientContext);
  const { data: thumbnail } = hooks.useItemThumbnail(itemId);

  const classes = useStyles();

  const LinkComponent = ({ children }) =>
    link ? <Link href={link}>{children}</Link> : children;
  LinkComponent.propTypes = {
    children: PropTypes.element,
  };
  LinkComponent.defaultProps = {
    children: null,
  };

  const image = thumbnail || DEFAULT_ITEM_IMAGE_PATH;

  return (
    <CardMedia className={clsx(classes.media, className)} title={name}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <LinkComponent>
          <img src={image} layout="fill" width="100%" alt={name} />
        </LinkComponent>
      </div>
    </CardMedia>
  );
};

CardMediaComponent.propTypes = {
  itemId: PropTypes.string.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
};

CardMediaComponent.defaultProps = {
  className: '',
  link: null,
};

export default CardMediaComponent;
