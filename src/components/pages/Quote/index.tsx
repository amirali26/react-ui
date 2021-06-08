import {
  Container, CssBaseline, makeStyles, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Route } from 'react-router-dom';
import routes from '../../../utils/routes/routes';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'blue',
  },
});

const Quote: React.FC = () => {
  const styles = useStyles();
  return (
    <Route path={routes.quote}>
      <Container maxWidth="xl">
        <div className="logo">
          <Typography variant="h1">Some Logo</Typography>
        </div>
        <MainCard />
      </Container>
    </Route>
  );
};

export default Quote;
