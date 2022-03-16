import React from 'react';
import { routines } from '@graasp/query-client';
import { toast } from 'react-toastify';
import i18n from './i18n';
import ToastrWithLink from '../components/common/ToastrWithLink';
import { buildPerformViewItemRoute } from './constants';

export const COPY_RESOURCE_LINK_TO_CLIPBOARD = {
  SUCESS: 'success',
  FAILURE: 'failure',
};

// TODO: use a universal notifier
const notifier = ({ type, payload }) => {
  switch (type) {
    case routines.copyItemRoutine.FAILURE:
      toast.error(i18n.t('An error occured while copying the item'));
      break;
    case routines.copyItemRoutine.SUCCESS:
      toast.success(
        <ToastrWithLink
          link={buildPerformViewItemRoute(payload.id)}
          text={i18n.t('The item was copied successfully')}
          linkText={i18n.t('Click here to open the item on Graasp.')}
        />,
      );
      break;
    case routines.postItemFlagRoutine.FAILURE:
      toast.error(i18n.t('An error occured while flagging the item'));
      break;
    case routines.postItemFlagRoutine.SUCCESS:
      toast.success(i18n.t('The item was successfully flagged.'));
      break;
    case COPY_RESOURCE_LINK_TO_CLIPBOARD.SUCCESS:
      toast.success(i18n.t('The item resource was successfully copied.'));
      break;
    case COPY_RESOURCE_LINK_TO_CLIPBOARD.FAILURE:
      toast.error(i18n.t('An error occured while copying the resource link.'));
      break;
    case routines.downloadItemRoutine.FAILURE:
      toast.error(
        i18n.t(
          'An error occured while downloading the item. Please try again later.',
        ),
        {
          variant: 'error',
        },
      );
      break;
    default:
  }
};
export default notifier;
