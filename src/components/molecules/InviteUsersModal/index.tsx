import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { Autocomplete } from '@mui/lab';
import { useFormik } from 'formik';
import {
  Button, Chip, CircularProgress, TextField,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import * as Yup from 'yup';
import useHelpmycaseSnackbar from '../../../hooks/useHelpmycaseSnackbar';
import { Account } from '../../../models/account';
import ADD_ACCOUNT_USER_INVITATIONS from '../../../mutations/accountUserMutations';
import { userVar } from '../../../pages/Dashboard';
import { GET_ACCOUNT } from '../../../queries/account';
import Modal from '../modal';

type Props = {
  open: boolean;
  onClose: () => void;
}

const initialValues: { emailAddresses: string[] } = {
  emailAddresses: [],
};

const formValidationSchema = Yup.object().shape({
  emailAddresses: Yup.array().of(
    Yup.string().email('Please enter a valid email address'),
  ).required('Please enter atleast one valid email address'),
});

const InviteAdditionalUsersModal: React.FC<Props> = ({ open, onClose }) => {
  const sb = useHelpmycaseSnackbar();
  const user = useReactiveVar(userVar);
  const [accountInformationQuery] = useLazyQuery<{ userAccount: Account }[]>(GET_ACCOUNT, {
    onCompleted: (data) => {
      if (data.length) {
        userVar({
          ...user,
          selectedAccount: data[0].userAccount,
          accountUserInvitations: data[0].userAccount.accountUserInvitations,
        });
      }
      onClose();
    },
  });

  const [addAuii, { loading }] = useMutation(ADD_ACCOUNT_USER_INVITATIONS, {
    onCompleted: () => {
      accountInformationQuery({
        variables: {
          accountId: user.selectedAccount?.id,
        },
      });
      sb.trigger('Invitation(s) sent', 'success');
    },
  });

  const formik = useFormik({
    initialValues,
    isInitialValid: false,
    validateOnMount: true,
    onSubmit: async (values: { emailAddresses: string[] }) => {
      addAuii({
        variables: {
          auii: {
            userEmails: values.emailAddresses,
          },
        },
      });
    },
    validationSchema: formValidationSchema,
  });

  return (
    <Modal open={open} handleClose={onClose}>
      <>
        <Autocomplete
          multiple
          id="tags-filled"
          freeSolo
          options={[]}
          value={formik.values.emailAddresses}
          onChange={(event, newValue) => {
            formik.setFieldValue('emailAddresses', newValue);
          }}
          renderTags={(value: readonly unknown[], getTagProps) => value.map((
            option: unknown, index: number,
          ) => (
            <Chip variant="filled" label={option as string} {...getTagProps({ index })} key={option as string} />
          ))}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Invite Users To Account"
              helperText={
                formik.touched.emailAddresses
                && formik.errors.emailAddresses?.length
                && formik.errors.emailAddresses[0]
              }
              error={
                Boolean(
                  formik.touched.emailAddresses
                  && formik.errors.emailAddresses,
                )
              }
            />
          )}
        />
        <Button
          sx={{ height: '48px' }}
          variant="contained"
          color="primary"
          className="marginTop fullWidth"
          type="submit"
          onClick={() => formik.submitForm()}
          disabled={Boolean(!formik.isValid || loading)}
          startIcon={loading && <CircularProgress color="secondary" size="12px" />}
        >
          Add Users
        </Button>
      </>
    </Modal>
  );
};

export default InviteAdditionalUsersModal;
