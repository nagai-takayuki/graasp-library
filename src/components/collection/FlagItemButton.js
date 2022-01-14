import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@material-ui/core';
import ReportIcon from '@material-ui/icons/Report';
import PropTypes from 'prop-types';

const ItemFlagDialog = dynamic(() => import('@graasp/ui').then((mod) => mod.ItemFlagDialog), {
  ssr: false,
});

export const FlagItemButton = ({
  flags,
  onFlag,
  open,
  setOpen,
  selectedFlag,
  setSelectedFlag,
}) => {
  const { t } = useTranslation();

  const openItemFlagDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <Tooltip title={t('Report')}>
        <IconButton color='primary' onClick={openItemFlagDialog}>
          <ReportIcon fontSize='large' />
        </IconButton>
      </Tooltip>
      <ItemFlagDialog
        flags={flags}
        onFlag={onFlag}
        open={open}
        setOpen={setOpen}
        selectedFlag={selectedFlag}
        setSelectedFlag={setSelectedFlag}
      />
    </>
  );
};

FlagItemButton.propTypes = {
  flags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  onFlag: PropTypes.func.isRequired,
  open: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  selectedFlag: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  setSelectedFlag: PropTypes.func.isRequired,
};

export default FlagItemButton;