import { useMutation, useQuery } from '@apollo/client';
import { BadgeOutlined, EmailOutlined, LanguageOutlined } from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useFormik } from 'formik';
import {
  Box,
  Button, Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import * as Yup from 'yup';
import useHelpmycaseSnackbar from '../../../../../hooks/useHelpmycaseSnackbar';
import { Account, AccountType } from '../../../../../models/account';
import { AreasOfLegalPractice } from '../../../../../models/areas-of-legal-practice';
import { ADD_ACCOUNT } from '../../../../../mutations/account';
import { UserAccount, userVar } from '../../../../../pages/Dashboard';
import GET_AREASOFLEGALPRACTICE from '../../../../../queries/areas-of-legal-practice';
import Title from '../../../../molecules/Title';

type InitialValues = {
  name: string,
  email: string,
  phoneNumber: string,
  website: string,
  type: AccountType,
  registeredDate: string,
  handledAreasOfPractice: string[],
}

const initialValues: InitialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  website: '',
  type: AccountType.LONDON_LARGE_COMMERCIAL,
  handledAreasOfPractice: [],
  registeredDate: '',
};

const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\\?[a-zA-Z-_%\\/@?]+)*([^\\/\w\\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string().email().required('Please provide an email'),
  phoneNumber: Yup.string()
    .matches(new RegExp('^[0-9]*$'), 'Phone number should be only numbers')
    .min(10, 'Phone number should be 10 digits')
    .max(10, 'Phone number should be 10 digits')
    .required('Phone number is a required field'),
  website: Yup.string().matches(regMatch, 'Website should be a valid URL').required('Please provide a URL'),
  type: Yup.string().oneOf([...Object.keys(AccountType)], 'Please choose a valid enum type'),
  handledAreasOfPractice: Yup.array().min(1, 'You must choose atleast one area which you cover'),
  users: Yup.array().min(1, 'You must choose atleast one account permission'),
  registeredDate: Yup.date().required('Please provide a incorporation date for your firm'),
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
              ...values,
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
          title="Register Firm"
          subtitle="Register your firm with your user, and add existing users to it. Your firm will be visible to clients whenever you make an enquiry."
        />
        <div className="fullWidth flex row" style={{ flexWrap: 'wrap' }}>
          <div style={{ width: '47%', padding: 8 }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopSmall">Name</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="name"
              fullWidth
              color="primary"
              helperText={formik.touched.name && formik.errors.name}
              error={Boolean(formik.touched.name && formik.errors.name)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ width: '47%', padding: 8 }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopSmall">Email</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="email"
              fullWidth
              color="primary"
              helperText={formik.touched.email && formik.errors.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ width: '47%', padding: 8 }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopSmall">Phone Number</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="phoneNumber"
              fullWidth
              color="primary"
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">+44</InputAdornment>,
              }}
            />
          </div>
          <div style={{ width: '47%', padding: 8 }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopSmall">Website</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="website"
              fullWidth
              color="primary"
              helperText={formik.touched.website && formik.errors.website}
              error={Boolean(formik.touched.website && formik.errors.website)}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LanguageOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div style={{ width: '47%', padding: 8 }}>
            <FormControl fullWidth className="marginBottomSmall marginTopSmall">
              <InputLabel id="demo-simple-select-label">Firm Type</InputLabel>
              <Select
                value={formik.values.type}
                label="Select Firm Type"
                onChange={(e: SelectChangeEvent) => {
                  formik.setFieldValue('type', e.target.value);
                }}
              >
                <MenuItem value={AccountType.LONDON_LARGE_COMMERCIAL}>
                  London / Large Commercial
                </MenuItem>
                <MenuItem value={AccountType.LONDON_AMERICAN_FIRMS}>
                  London / American Firms
                </MenuItem>
                <MenuItem value={AccountType.LONDON_MID_SIZED_COMMERCIAL}>
                  London / Mid Sized Commercial
                </MenuItem>
                <MenuItem value={AccountType.LONDON_SMALLER_COMMERCIAL}>
                  London / Smaller Commercial
                </MenuItem>
                <MenuItem value={AccountType.REGIONAL_FIRMS}>
                  Regional Firms
                </MenuItem>
                <MenuItem value={AccountType.GENERAL_PRACTICE_SMALL_FIRMS}>
                  General Practice / Small Firms
                </MenuItem>
                <MenuItem value={AccountType.NATIONAL_MULTISITE_FIRMS}>
                  National / Multi-Site Firms
                </MenuItem>
                <MenuItem value={AccountType.NICHE_FIRMS}>
                  Niche Firms
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <Box style={{ width: '47%', padding: 8 }} sx={{ '& > div': { width: '100%', margin: '8px 0' } }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                label="Registration Date"
                value={formik.values.registeredDate}
                onChange={(newValue) => {
                  formik.setFieldValue('registeredDate', newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
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
