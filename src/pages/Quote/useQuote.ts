import React, { useState } from 'react';

export type TQuote = {
    pageIndex: number,
    setPageIndex: React.Dispatch<React.SetStateAction<number>>
}

const useQuote = () => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const calculateLoaderStatus = (): number => 2;

  return {
    pageIndex,
    setPageIndex,
    calculateLoaderStatus,
  };
};

export default useQuote;
