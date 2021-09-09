import { Button, ButtonProps, Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

interface IProps {
    icon: JSX.Element,
    title: string,
    subtitle: string,
    buttonProps: ButtonProps,
}

const BigMessage: React.FC<IProps> = ({
  icon, title, subtitle, buttonProps,
}: IProps) => {
  const x = 2;
  return (
    <div className="absolute alignCenter">
      <div className="marginBottomMedium">
        { icon }
      </div>
      <Typography variant="h2" className="marginBottomSmall">{title}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
      <Button {...buttonProps}>
        {buttonProps.children}
      </Button>
    </div>
  );
};

export default BigMessage;
