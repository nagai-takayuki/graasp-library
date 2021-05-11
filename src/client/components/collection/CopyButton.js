import React, { useState, useLayoutEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import TreeModal from './TreeModal';
import { copyItem } from '../../actions/item';
import { LoginModalContext } from '../common/LoginModalContext';
import { useUser } from '../../utils/user';

const CopyButton = ({ id }) => {
  const { t } = useTranslation();
  const { id: collectionId } = useParams();
  const [showTreeModal, setShowTreeModal] = useState(false);
  const { data: isSignedIn } = useUser(false);
  const [copying, setCopying] = useState(false);
  const { setOpen: openLoginModal, open: showLoginModal } = useContext(
    LoginModalContext,
  );

  useLayoutEffect(() => {
    // if the user signs in while the login modal is open
    // switch to copy modal
    if (showLoginModal && isSignedIn) {
      openLoginModal(false);
      setShowTreeModal(true);
    }
    // if user signs out while copying
    // show login modal instead
    else if (showTreeModal && !isSignedIn) {
      openLoginModal(true);
      setShowTreeModal(false);
    }
  }, [isSignedIn]);

  const onClick = () => {
    // display sign in modal if the user is not signed in
    if (!isSignedIn) {
      openLoginModal(true);
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
