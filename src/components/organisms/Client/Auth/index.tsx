import { LockOutlined } from '@mui/icons-material';
import { Auth } from 'aws-amplify';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from 'helpmycase-storybook/dist/components/External';
import theme from 'helpmycase-storybook/dist/theme/theme';
import React, { useState } from 'react';
import ReactCodeInput from 'react-code-input';
import * as Yup from 'yup';
import { useClientAuthContext } from '../../../../context/ClientAuthContext';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import BackdropLoader from '../../../molecules/backdropLoader';

type InitialValues = {
  email: string,
  phoneNumber: string,
  code: string,
}

const initialValues: InitialValues = {
  email: '',
  phoneNumber: '',
  code: '',
};

const formValidationSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address')
    .required('Email address is required'),
  phoneNumber: Yup.string()
    .matches(new RegExp('^[0-9]*$'), 'Phone number should be only numbers')
    .min(10, 'Phone number should be 10 digits')
    .max(10, 'Phone number should be 10 digits')
    .required('Phone number is a required field'),
});

const ClientAuth: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState();
  const { setUser } = useClientAuthContext();
  const sb = useHelpmycaseSnackbar();

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await Auth.signIn(values.email);
        setSession(response);
      } catch (e) {
        sb.trigger(e instanceof Error ? e.message : '');
      } finally {
        setLoading(false);
      }
    },
    validationSchema: formValidationSchema,
  });

  const handleConfirmTokenSubmit = async () => {
    if (session) {
      const response = await Auth.sendCustomChallengeAnswer(session, formik.values.code);
      if (response) {
        setUser(response);
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <div style={{
          width: '90px',
          height: '90px',
          backgroundColor: theme.palette.primary.main,
          borderRadius: '50%',
          position: 'relative',
        }}
        >
          <LockOutlined sx={{
            position: 'absolute',
            color: 'white',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '40px',
          }}
          />
        </div>
        <Typography variant="h5" className="marginTopMedium" color="white">Confirm Your Identity</Typography>
        <Typography variant="subtitle1" className="marginTopSmall" color="#ffffffb8">
          {
            session
              ? 'Please input the code sent to your device'
              : 'Enter the required fields below to view your enquiries'
          }
        </Typography>
        {
          session
            ? (
              <>
                <ReactCodeInput
                  style={{ marginTop: '16px' }}
                  type="text"
                  fields={6}
                  name="code"
                  onChange={(e) => formik.setFieldValue('code', e)}
                  autoFocus
                  inputMode="numeric"
                />
                <Button
                  variant="contained"
                  className="marginTopMedium"
                  fullWidth
                  onClick={handleConfirmTokenSubmit}
                  disabled={formik.values.code.length < 6}
                >
                  Authenticate
                </Button>
              </>
            )
            : (
              <div>
                <TextField
                  id="email"
                  name="email"
                  fullWidth
                  color="primary"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  placeholder="Email Address"
                  sx={{ backgroundColor: '#c7c7c7', borderRadius: '5px' }}
                  className="marginTopMedium"
                />
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  fullWidth
                  color="primary"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                  placeholder="Phone Number"
                  sx={{ backgroundColor: '#c7c7c7', borderRadius: '5px' }}
                  className="marginTopMedium"
                />
                <Button variant="contained" className="marginTopMedium" fullWidth type="submit">
                  Authenticate
                </Button>
              </div>
            )
        }
      </div>
      <BackdropLoader open={loading} />

    </form>
  );
};
export default ClientAuth;
