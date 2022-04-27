import { useMutation } from '@apollo/client';
import { WarningAmberOutlined } from '@mui/icons-material';
import { Button, Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import { Account } from '../../../../models/account';
import DELETE_ACCOUNT from '../../../../mutations/deleteAccount';
import Modal from '../../../molecules/modal';

interface Props {
  open: boolean,
  handleClose: () => void;
}

const DeleteAccountModal: React.FC<Props> = ({ open, handleClose }) => {
  const sb = useHelpmycaseSnackbar();
  const [deleteAccount] = useMutation<{ deleteAccount: Account }>(DELETE_ACCOUNT, {
    onCompleted: () => {
      sb.trigger('Account Deleted', 'info');
    },
    onError: () => {
      sb.trigger('There was an error deleting your account');
    },
  });
  return (
    <Modal open={open} handleClose={handleClose}>
      <div style={{ textAlign: 'center' }}>
        <WarningAmberOutlined sx={{ fontSize: '60px' }} color="primary" />
        <Typography variant="h6">Are you sure you want to delete your firm?</Typography>
        <Typography variant="body1" className="marginBottom">You can not undo this action</Typography>
        <Button onClick={() => deleteAccount()} variant="contained">Yes, I would like to delete firm</Button>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
