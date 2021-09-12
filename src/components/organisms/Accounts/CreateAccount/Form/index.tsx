import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import {
  Button, CircularProgress, InputLabel, TextField,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import * as Yup from 'yup';
import useHelpmycaseSnackbar from '../../../../../hooks/useHelpmycaseSnackbar';
import { Account } from '../../../../../models/account';
import { ADD_ACCOUNT } from '../../../../../mutations/account';
import { UserAccount, userVar } from '../../../../../pages/Dashboard';

const initialValues = {
  name: '',
};

const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Account name is required'),
});

interface IProps {
  callback?: () => void;
}

const Form: React.FC<IProps> = ({ callback }: IProps) => {
  const sb = useHelpmycaseSnackbar();
  const [addAccount, { loading, error }] = useMutation<{ addAccount: Account}>(ADD_ACCOUNT, {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onCompleted: (data) => updateUserVar(data.addAccount),
  });
  const formik = useFormik({
    initialValues,
    initialErrors: initialValues,
    onSubmit: async (values) => {
      try {
        addAccount({
          variables: {
            account: {
              name: values.name,
              usersIds: [userVar().user.id],
            },
          },
        });
        if (error) {
          throw Error(error.message);
        }
      } catch (e) {
        sb.trigger(e.message);
      }
    },
    validationSchema: formValidationSchema,
  });

  function updateUserVar(account: Account) {
    const currentUserInformation = userVar();
    if (currentUserInformation && account) {
      const userAccount: UserAccount = {
        user: { ...currentUserInformation.user },
        accounts: [...(currentUserInformation.accounts || []), account],
      };
      userVar(userAccount);
    }
    sb.trigger('An account has been successfully created', 'success');
    if (callback) {
      callback();
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fullWidth marginTop">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Account name</InputLabel>
        <TextField
          id="input-with-icon-adornment"
          name="name"
          fullWidth
          color="primary"
          helperText={formik.touched.name && formik.errors.name}
          error={Boolean(formik.touched.name && formik.errors.name)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        className="marginTop fullWidth"
        type="submit"
        disabled={Boolean(!formik.isValid || loading)}
        startIcon={loading && <CircularProgress color="secondary" size="12px" />}
      >
        Create Account
      </Button>
    </form>
  );
};

export default Form;
