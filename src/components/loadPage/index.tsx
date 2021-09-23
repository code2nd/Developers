import React from 'react';
import Loading from 'components/loading';

const loadPage = (Cmp: React.LazyExoticComponent<any>) => {
  return () => {
    return (
      <React.Suspense fallback={<Loading />}>
        <Cmp />
      </React.Suspense>
    );
  };
};

export default loadPage;