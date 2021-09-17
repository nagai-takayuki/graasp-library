import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { QueryClientContext } from '../QueryClientContext';

function Contributors({ itemId, authorId }) {
  const { hooks } = useContext(QueryClientContext);
  const { data: memberships, isLoading } = hooks.useItemMemberships(itemId);
  const membersId = memberships
    ?.filter(
      ({ permission, memberId }) =>
        (permission === 'write' || permission === 'admin') &&
        memberId !== authorId,
    )
    ?.map(({ memberId }) => memberId)
    ?.toArray();
  const { data: members, isLoading: isLoadingMembers } = hooks.useMembers(
    membersId,
  );
  const { t } = useTranslation();

  if (isLoading || isLoadingMembers) {
    return 'Loading...';
  }

  if (!members || members.isEmpty()) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t('Contributors')}
      </Typography>
      <AvatarGroup max={8}>
        {/* {contributors.map((contributor) => {
          const {
            name: contributorName,
            image: contributorAvatar,
          } = contributor;
          const avatar = getAvatar(contributorAvatar);
          return <Avatar alt={contributorName} src={avatar} />;
        })} */}
      </AvatarGroup>
    </>
  );
}

Contributors.propTypes = {
  itemId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
};

export default Contributors;
