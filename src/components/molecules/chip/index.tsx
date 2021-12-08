import theme from 'helpmycase-storybook/dist/theme/theme';
import React from 'react';

const Chip: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      borderRadius: '5px',
      backgroundColor: theme.palette.success.main,
      padding: '8px',
      color: 'white',
      textAlign: 'center',
    }}
  >
    {text}
  </div>
);

export default Chip;
