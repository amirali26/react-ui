import { Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

const HelperText: React.FC = () => (
  <div className="flex column textAlignLeft">
    <Typography variant="h4" className="marginTopMedium">
      A few clicks away from finding new clients!
    </Typography>
    <Typography variant="subtitle1" className="marginTopMedium">
      Helpmycase streamlines the process of managing and finding new clients.
      Find and onboard clients in no time using our free to use service.
    </Typography>
  </div>
);

export default HelperText;
