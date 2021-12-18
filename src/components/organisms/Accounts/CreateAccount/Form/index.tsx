import { useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import {
  Button, Checkbox, CircularProgress, FormControlLabel, InputLabel, TextField,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import * as Yup from 'yup';
import useHelpmycaseSnackbar from '../../../../../hooks/useHelpmycaseSnackbar';
import { Account } from '../../../../../models/account';
import { AreasOfLegalPractice } from '../../../../../models/areas-of-legal-practice';
import { ADD_ACCOUNT } from '../../../../../mutations/account';
import { UserAccount, userVar } from '../../../../../pages/Dashboard';
import GET_AREASOFLEGALPRACTICE from '../../../../../queries/areas-of-legal-practice';
import Title from '../../../../molecules/Title';

type InitialValues = {
  name: string,
  handledAreasOfPractice: string[],
}

const initialValues: InitialValues = {
  name: '',
  handledAreasOfPractice: [],
};

const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Account name is required'),
  handledAreasOfPractice: Yup.array().min(1, 'You must choose atleast one area which you cover'),
  users: Yup.array().min(1, 'You must choose atleast one account permission'),
});

interface IProps {
  callback?: () => void;
}

const Form: React.FC<IProps> = ({ callback }: IProps) => {
  const sb = useHelpmycaseSnackbar();

  const legalPracticeQuery = useQuery<{
    areasOfPractices: AreasOfLegalPractice[]
  }>(GET_AREASOFLEGALPRACTICE, {
    fetchPolicy: 'cache-and-network',
  });

  const [addAccount, { loading, error }] = useMutation<{ addAccount: Account }>(ADD_ACCOUNT, {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    onCompleted: (data) => updateUserVar(data.addAccount),
  });

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        addAccount({
          variables: {
            accountInput: {
              name: values.name,
              areasOfPracticeId: values.handledAreasOfPractice,
            },
          },
        });
        if (error) {
          throw Error(error.message);
        }
      } catch (e) {
        sb.trigger(e instanceof Error ? e.message : '');
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
    <form onSubmit={formik.handleSubmit} style={{ width: '600px', height: '100%' }} className="flex column spaceBetween">
      <div>
        <Title
          title="Create Account"
          subtitle="Create a new account for your user on this page"
        />
        <div className="fullWidth flex row">
          <div style={{ width: '100%', padding: 8 }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Account Name</InputLabel>
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
        </div>
        <div className="marginTopMedium" style={{ padding: 8 }}>
          <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Handled Areas of Practice</InputLabel>
          <div style={{
            width: '100%', border: '1px solid #9994', padding: 8,
          }}
          >
            {
              legalPracticeQuery.data?.areasOfPractices.map((aolp: AreasOfLegalPractice) => (
                <FormControlLabel
                  key={aolp.id}
                  checked={formik.values.handledAreasOfPractice.includes(aolp.id)}
                  onChange={() => {
                    const index = formik.values.handledAreasOfPractice.indexOf(aolp.id);
                    const copiedArray = [...formik.values.handledAreasOfPractice];
                    if (index >= 0) {
                      formik.setFieldValue('handledAreasOfPractice',
                        copiedArray.filter((a) => a !== aolp.id));
                      return;
                    }
                    copiedArray.push(aolp.id);
                    formik.setFieldValue('handledAreasOfPractice', copiedArray);
                  }}
                  className="marginTopMedium"
                  control={
                    <Checkbox checked={formik.values.handledAreasOfPractice.includes(aolp.id)} />
                  }
                  label={aolp.name}
                  sx={{ margin: 0, marginTop: '0 !important', width: '100%' }}
                />
              ))
            }
          </div>
        </div>
      </div>
      <Button
        sx={{ height: '48px' }}
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
