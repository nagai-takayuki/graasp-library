import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import LoginModal from './LoginModal';
import TreeModal from './TreeModal';
import { copyItem } from '../../actions/item';
import { isAuthenticated } from '../../actions/user';

const CopyButton = ({ id }) => {
  const { t } = useTranslation();
  const { id: collectionId } = useParams();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTreeModal, setShowTreeModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [copying, setCopying] = useState(false);

  const checkUserIsSignedIn = async () => {
    const res = await isAuthenticated();
    setIsSignedIn(res);
  };

  useEffect(() => {
    checkUserIsSignedIn();
    // check whether user is signed in each time
    // the user switch to explore tab
    window.addEventListener('focus', checkUserIsSignedIn);
  }, []);

  useLayoutEffect(() => {
    // if the user signs in while the login modal is open
    // switch to copy modal
    if (showLoginModal && isSignedIn) {
      setShowLoginModal(false);
      setShowTreeModal(true);
    }
    // if user signs out while copying
    // show login modal instead
    else if (showTreeModal && !isSignedIn) {
      setShowLoginModal(true);
      setShowTreeModal(false);
    }
  }, [isSignedIn]);

  const onClick = () => {
    // display sign in modal if the user is not signed in
    if (!isSignedIn) {
      setShowLoginModal(true);
    } else {
      setShowTreeModal(true);
    }
  };

  const copy = ({ id: toSpace }) => {
    const body = {
      fromSpace: collectionId,
      inheritMemberships: false,
      items: [id],
      keepMemberships: false,
      toSpace,
    };

    // set loading icon
    setCopying(true);

    // remove loading icon on callback
    copyItem({ body }, () => setCopying(false));
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
