import { ReportProblemOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import BigMessage from '../../../molecules/bigMessage';
import Drawer from '../../../molecules/Drawer';
import Form from './Form';

const CreateAccount: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BigMessage
        icon={<ReportProblemOutlined />}
        title="No Firms Found"
        subtitle="Your user is not currently associated with any firms, please click on the button below to register your firm for free"
        buttonProps={{
          children: 'Register Firm',
          onClick: handleOpen,
        }}
      />
      <Drawer open={open} onClose={handleClose}>
        <Form callback={handleClose} />
      </Drawer>
    </div>
  );
};

export default CreateAccount;
