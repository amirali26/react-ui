import { useState } from 'react';

const useQuote = () => {
  const [pageIndex, setPageIndex] = useState<number>();

  const calculateLoaderStatus = (): number => 2;

  return {
    pageIndex,
    setPageIndex,
    calculateLoaderStatus,
  };
};

export default useQuote;
