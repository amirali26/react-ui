import { gql, useQuery } from '@apollo/client';
import {
  makeStyles,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../../../utils/routes/routes';
import MainCard from './MainCard';
import Section from './Section';
import useQuote from './useQuote';

const useStyles = makeStyles({
  root: {
  },
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
const Quote: React.FC = () => {
  const { pageIndex, setPageIndex } = useQuote();
  const styles = useStyles();

  const query = useQuery<{
    currency: string,
    rate: string,
  }[]>(EXCHANGE_RATES);

  if (query.loading) return <p>Something is loading</p>;
  if (query.error) return <p>Error: </p>;
  if (query.data?.length) {
    return (
      <>
        {
          query.data?.map((item) => (
            <div key={item.currency}>
              { item.currency}
              {' '}
              :
              {' '}
              { item.rate}
            </div>
          ))
        }
      </>
    );
  }

  return <></>;
};

export default Quote;
