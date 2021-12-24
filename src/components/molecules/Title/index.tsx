import { Divider, Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

interface IProps {
  title: string,
  subtitle: string,
  hideDivider?: boolean,
}

const Title: React.FC<IProps> = ({ title, subtitle, hideDivider }) => (
  <div>
    <Typography variant="h5">{title}</Typography>
    <Typography variant="subtitle1" className="grey">{subtitle}</Typography>
    {
      hideDivider
      || <Divider className="marginTop marginBottom" />
    }
  </div>
);

export default Title;
