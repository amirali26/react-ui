import { Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

interface IProps {
    title: string | JSX.Element[];
    subtitle: string | JSX.Element[];
}
const FormTitle:React.FC<IProps> = ({ title, subtitle }: IProps) => (
  <div className="textAlignLeft">
    <Typography variant="h1" color="inherit">
      {title}
    </Typography>
    <Typography variant="subtitle1" className="marginTopMedium">
      {subtitle}
    </Typography>
  </div>
);

export default FormTitle;
