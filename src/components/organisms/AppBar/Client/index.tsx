import clsx from 'clsx';
import { AppBar, Toolbar } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { useStyles } from '..';
import Logo from '../../../atoms/Logo';

const ClientAppBar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <div className={clsx(classes.title)}>
          <Logo width={200} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ClientAppBar;
