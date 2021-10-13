import { Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

const HelperText: React.FC = () => (
  <div>
    <Typography variant="h4" className="marginTopMedium">
      Did you know?
    </Typography>
    <Typography variant="subtitle1" className="marginTopMedium">
      We have helped connect over 15,000 customers with solicitors.
    </Typography>
  </div>
);

export default HelperText;
