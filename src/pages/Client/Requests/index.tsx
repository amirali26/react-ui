import { Button, Link, Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Summary } from '../../../components/templates/Client';

const BreadCrumbs = ([
  <Link key="/client" underline="hover" color="inherit" href="/client">
    Home
  </Link>,
  <Typography key="Requests" color="text.primary">Requests</Typography>,
]);

const Requests: React.FC = () => (
  <div>
    <Summary
      breadcrumbs={BreadCrumbs}
      title="My Requests"
      subtitle="A detailed list of all of your requests which have been made"
      rightElement={(
        <Button
          variant="contained"
          style={{
            width: '250px',
            height: '50px',
          }}
        >
          View Your Latest Request
        </Button>
      )}
    />
  </div>
);

export default Requests;
