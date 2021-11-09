import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { List } from 'immutable';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { getAvatar } from '../../utils/layout';

function Contributors({ contributors }) {
  const { t } = useTranslation();

  if (!contributors || contributors.isEmpty()) {
    return null;
  }

  return (
    <>
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
          return (
            <Avatar key={contributorName} alt={contributorName} src={avatar} />
          );
        })}
      </AvatarGroup>
    </>
  );
}

Contributors.propTypes = {
  contributors: PropTypes.instanceOf(List),
};

Contributors.defaultProps = {
  contributors: List(),
};

export default Contributors;
