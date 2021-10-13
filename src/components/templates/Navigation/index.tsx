import React, { useState } from 'react';
import NavigationAppBar from '../../organisms/AppBar';
import NavigationSideBar from '../../organisms/Drawer';

export const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (_open: boolean): void => {
    setOpen(_open);
  };

  return (
    <>
      <NavigationAppBar handleOpen={handleOpen} />
      <NavigationSideBar open={open} handleOpen={handleOpen} />
    </>
  );
};

export default Navigation;
