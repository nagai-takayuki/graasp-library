import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  COPY_ROUTE,
  IS_AUTHENTICATED_ROUTE,
  buildSpaceRoute,
} from '../../config/routes';
import { DEFAULT_GET, DEFAULT_POST } from '../../../api/common';
import LoginModal from './LoginModal';
import TreeModal from './TreeModal';
import { CollectionContext } from '../CollectionProvider';

const useStyles = makeStyles((theme) => ({
  successLink: {
    display: 'block',
    fontStyle: 'italic',
    color: 'inherit',
    paddingTop: theme.spacing(0.5),
  },
}));

const CopyButton = ({ id }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    current: { id: collectionId },
  } = useContext(CollectionContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTreeModal, setShowTreeModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [copying, setCopying] = useState(false);

  const checkUserIsSignedIn = async () => {
    const res = await (await fetch(IS_AUTHENTICATED_ROUTE, DEFAULT_GET)).json();
    setIsSignedIn(res);
  };

  useEffect(async () => {
    checkUserIsSignedIn();
    window.onfocus = checkUserIsSignedIn;
  }, []);

  // on sign in, open tree modal instead of login modal
  useEffect(() => {
    if (showLoginModal) {
      setShowLoginModal(false);
      setShowTreeModal(true);
    }
  }, [isSignedIn]);

  const onClick = async () => {
    if (!isSignedIn) {
      setShowLoginModal(true);
    } else {
      setShowTreeModal(true);
    }

    setShowTreeModal(true);
  };

  const copy = async ({ id: toSpace }) => {
    const body = {
      fromSpace: collectionId,
      inheritMemberships: false,
      items: [id],
      keepMemberships: false,
      toSpace,
    };

    setCopying(true);

    fetch(COPY_ROUTE, { ...DEFAULT_POST, body: JSON.stringify(body) }).then(
      async (copiedElement) => {
        setCopying(false);
        const res = await copiedElement.json();

        if (res) {
          const { _id: newItemId } = res;
          const link = buildSpaceRoute(newItemId);
          toast.success(
            <div>
              {t('The item was copied successfully')}
              <Link className={classes.successLink} target="_blank" to={link}>
                {t('Click here to open the item on Graasp.')}
              </Link>
            </div>,
          );
        } else {
          toast.error(t('An error occured while copying the item'), {
            variant: 'error',
          });
        }
      },
    );
  };

  const renderButton = () => {
    if (copying) {
      return <CircularProgress color="primary" size={20} />;
    }

    return (
      <Tooltip title={t('Copy')}>
        <IconButton onClick={onClick} aria-label="copy">
          <FileCopyIcon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {renderButton()}
      <LoginModal open={showLoginModal} setOpen={setShowLoginModal} />
      <TreeModal
        description={t('Select one space from the list below')}
        title={t('Copy Item')}
        open={showTreeModal}
        onConfirm={copy}
        itemId={id}
        onClose={() => setShowTreeModal(false)}
      />
    </>
  );
};

CopyButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CopyButton;
