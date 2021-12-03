import * as React from 'react';
import { configureQueryClient, Api } from '@graasp/query-client';
import getConfig from 'next/config';
import PropTypes from 'prop-types';
import {
  PUBLISHED_ITEMS_KEY,
  QUERY_CLIENT_OPTIONS,
} from '../../src/config/constants';
import PreSchool from '../../src/components/home/PreSchool';
import Wrapper from '../../src/components/common/Wrapper';

function Page({ dehydratedState }) {
  return (
    <Wrapper dehydratedState={dehydratedState}>
      <PreSchool />
    </Wrapper>
  );
}

Page.propTypes = {
  dehydratedState: PropTypes.shape({}).isRequired,
};

export async function getServerSideProps() {
  const { publicRuntimeConfig } = getConfig();
  const { queryClient, dehydrate } = configureQueryClient(QUERY_CLIENT_OPTIONS);

  await queryClient.prefetchQuery(PUBLISHED_ITEMS_KEY, () =>
    Api.getPublicItemsWithTag(
      {
        tagId: publicRuntimeConfig.NEXT_PUBLIC_PUBLISHED_TAG_ID,
        withMemberships: true,
      },
      QUERY_CLIENT_OPTIONS,
    ).then((data) => data),
  );

  // Pass data to the page via props
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default Page;
