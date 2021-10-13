import { Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

interface IProps {
    title?: string | JSX.Element[];
    subtitle?: string | JSX.Element[];
    alignCenter?: boolean;
}
const FormTitle:React.FC<IProps> = ({ title, subtitle, alignCenter }: IProps) => (
  <div className={alignCenter ? 'textAlignCenter' : 'textAlignLeft'}>
    <Typography variant="h2" color="inherit">
      {title}
    </Typography>
    <Typography variant="subtitle1" className="marginTopMedium">
      {subtitle}
    </Typography>
  </div>
);

export default FormTitle;
