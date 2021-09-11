import { ReportProblemOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import BigMessage from '../../../molecules/bigMessage';
import Modal from '../../../molecules/modal';
import Form from './Form';

const CreateAccount = () => {
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
        title="No Account Found"
        subtitle="Your user is not currently associated with any accounts, please click on the button below to create a free account"
        buttonProps={{
          children: 'Create an account',
          onClick: handleOpen,
        }}
      />
      <Modal open={open} handleClose={handleClose}>
        <Form callback={handleClose} />
      </Modal>
    </div>
  );
};

export default CreateAccount;
