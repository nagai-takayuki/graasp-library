import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import CollectionsGrid from '../collection/CollectionsGrid';
import { CollectionContext } from '../CollectionProvider';

function Home() {
  const { collections } = useContext(CollectionContext);
  return (
    <div>
      <Typography variant="h2">Home</Typography>
      <CollectionsGrid collections={collections} />
    </div>
  );
}

export default Home;
