import { Button, Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { NavLink } from 'react-router-dom';

const HelperText: React.FC = () => (
  <div>
    <Typography variant="h4" className="marginTopMedium">
      Helping you to find trusted solicitors tailored to your legal case.
    </Typography>
    <Typography variant="subtitle1" className="marginTopMedium">
      Finding a trusted solicitor to handle your case is usually a big headache.
      HelpMyCase streamlines the process of finding the perfect
      solicitor tailored to your case for free!
    </Typography>
    <Button
      variant="contained"
      color="primary"
      className="marginTop"
      fullWidth
    >
      <NavLink to="/auth/register" className="white fullWidth removeUnderline">
        Don&apos;t have an account? Sign up for free
      </NavLink>
    </Button>
  </div>
);

export default HelperText;
