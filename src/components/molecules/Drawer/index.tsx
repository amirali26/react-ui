import { DrawerProps, Drawer as MuiDrawer } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

type IProps = DrawerProps

const Drawer: React.FC<IProps> = ({ children, ...rest }: IProps) => (
  <MuiDrawer {...rest} anchor="right">
    <div
      className="flex fullWidth row alignItemsCenter"
      style={{
        minWidth: '664px',
        boxSizing: 'border-box',
        padding: '32px 24px',
        height: '64px',
        backgroundColor: '#121212',
        boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      }}
    />
    <div style={{ margin: '32px' }}>
      {children}
    </div>
  </MuiDrawer>
);

export default Drawer;
