import { SwipeableDrawer } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

interface IProps {
    open: boolean;
    handleOpen: (open: boolean) => void;
}

export const NavigationSideBar: React.FC<IProps> = ({
  open,
  handleOpen,
}: IProps) => (
  <SwipeableDrawer
    open={open}
    onClose={() => handleOpen(false)}
    onOpen={() => handleOpen(true)}
    color="primary"
  >
    <h2>nice 2</h2>
  </SwipeableDrawer>
);

export default NavigationSideBar;
