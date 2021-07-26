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

const Quote: React.FC = () => {
  const { pageIndex, setPageIndex } = useQuote();
  const styles = useStyles();

  return (
    <Route path={routes.base}>
      <Section />
      <MainCard pageIndex={pageIndex} setPageIndex={setPageIndex} />
    </Route>
  );
};

export default Quote;
