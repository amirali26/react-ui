import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import {
  Button, Checkbox, Divider, Chip,
  FormControlLabel, InputAdornment, InputLabel, OutlinedInput, TextField, Tooltip,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import * as Yup from 'yup';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import { AccountPermission } from '../../../../models/account';
import EnquiryInput, { Enquiry as EnquiryType } from '../../../../models/enquiry';
import { ADD_ENQUIRY } from '../../../../mutations/enquiry';
import { userVar } from '../../../../pages/Dashboard';
import GET_REQUESTS from '../../../../queries/requests';
import convertToDateTime from '../../../../utils/datetime';
import BackdropLoader from '../../../molecules/backdropLoader';
import Title from '../../../molecules/Title';

type Props = {
  id: string,
  enquiry?: EnquiryType,
  handleCallback?: () => void,
}

const initialValues: EnquiryInput = {
  message: '',
  requestId: '',
  initialConsultationFee: 0,
  estimatedPrice: 0,
  officeAppointment: false,
  phoneAppointment: false,
  videoCallAppointment: false,
};

const formValidationSchema = Yup.object().shape({
  message: Yup.string()
    .required('You must provide an enquiry message'),
  initialConsultationFee: Yup.number()
    .required('Please provide an initial consulation fee'),
  estimatedPrice: Yup.number()
    .required('Please provide an estimated price covering the whole case'),
  officeAppointment: Yup.boolean(),
  phoneAppointment: Yup.boolean(),
  videoCallAppointment: Yup.boolean(),
  appointmentErrors: Yup.boolean().when(['officeAppointment', 'phoneAppointment', 'videoCallAppointment'], {
    is: (
      officeAppointment: boolean, phoneAppointment: boolean, videoCallAppointment: boolean,
    ) => officeAppointment || phoneAppointment || videoCallAppointment,
    then: Yup.bool().notRequired(),
    otherwise: Yup.bool().required(),
  }),
});

const Enquiry: React.FC<Props> = ({
  id,
  enquiry,
  handleCallback,
}) => {
  const sb = useHelpmycaseSnackbar();
  const user = userVar();
  const [addEnquiry, { loading }] = useMutation(ADD_ENQUIRY, {
    onCompleted: () => {
      sb.trigger('Successfully submitted your enquiry', 'success');
      if (handleCallback) handleCallback();
    },
    onError: ({ networkError }: any) => {
      sb.trigger(networkError?.result?.errors[0].message || networkError.message, 'error');
    },
  });

  async function handleFormSubmit(values: EnquiryInput) {
    addEnquiry({
      variables: {
        eq: {
          ...values,
          requestId: id,
          estimatedPrice: +values.estimatedPrice,
          initialConsultationFee: +values.initialConsultationFee,
        },
      },
      refetchQueries: [GET_REQUESTS],
    });
  }

  const formik = useFormik({
    initialValues,
    isInitialValid: false,
    validateOnMount: true,
    validationSchema: formValidationSchema,
    onSubmit: handleFormSubmit,
  });

  React.useEffect(() => {
    if (enquiry) {
      formik.setValues({
        estimatedPrice: enquiry.estimatedPrice,
        initialConsultationFee: enquiry.initialConsultationFee,
        message: enquiry.message,
        officeAppointment: enquiry.officeAppointment,
        phoneAppointment: enquiry.phoneAppointment,
        videoCallAppointment: enquiry.videoCallAppointment,
        requestId: enquiry.request.id,
      });
    }
  }, []);

  const title = enquiry ? 'View Enquiry' : 'Create Enquiry';
  const subtitle = enquiry ? 'Detailed view of an enquiry made to a client from your ogranisation'
    : 'Reach our to potential leads by creating an enquiry relating to their case';
  const enquiryButtonDisabled = !user.selectedAccount?.permission
    || user.selectedAccount.permission === AccountPermission.READ_ONLY;
  return (
    <form className="flex spaceBetween column" style={{ height: '100%' }} onSubmit={formik.handleSubmit}>
      <Title
        title={title}
        subtitle={subtitle}
      />
      <div className="fullWidth">
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopMedium">Message</InputLabel>
        <TextField
          id="input-with-icon-adornment"
          name="message"
          fullWidth
          color="primary"
          helperText={formik.touched.message && formik.errors.message}
          error={Boolean(formik.touched.message && formik.errors.message)}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          multiline
          maxRows={8}
          disabled={Boolean(enquiry)}
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopMedium">Initial Consulation Fee</InputLabel>
        <OutlinedInput
          id="input-with-icon-adornment"
          name="initialConsultationFee"
          fullWidth
          color="primary"
          value={formik.values.initialConsultationFee}
          startAdornment={<InputAdornment position="start">£</InputAdornment>}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={Boolean(enquiry)}
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopMedium">Estimated Fee</InputLabel>
        <OutlinedInput
          id="input-with-icon-adornment"
          name="estimatedPrice"
          fullWidth
          color="primary"
          value={formik.values.estimatedPrice}
          onChange={formik.handleChange}
          startAdornment={<InputAdornment position="start">£</InputAdornment>}
          onBlur={formik.handleBlur}
          disabled={Boolean(enquiry)}
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopMedium">Availablity</InputLabel>
        <FormControlLabel
          checked={formik.values.officeAppointment}
          onChange={() => {
            formik.setFieldValue('officeAppointment', !formik.values.officeAppointment);
          }}
          className="marginTopMedium"
          control={
            <Checkbox checked={formik.values.officeAppointment} />
          }
          label="Office Appointments"
          sx={{ margin: 0, marginTop: '0 !important', width: '100%' }}
          disabled={Boolean(enquiry)}
        />
        <br />
        <FormControlLabel
          checked={formik.values.videoCallAppointment}
          onChange={() => {
            formik.setFieldValue('videoCallAppointment', !formik.values.videoCallAppointment);
          }}
          className="marginTopMedium"
          control={
            <Checkbox checked={formik.values.videoCallAppointment} />
          }
          label="Video Call Appointments"
          sx={{ margin: 0, marginTop: '0 !important', width: '100%' }}
          disabled={Boolean(enquiry)}
        />
        <FormControlLabel
          checked={formik.values.phoneAppointment}
          onChange={() => {
            formik.setFieldValue('phoneAppointment', !formik.values.phoneAppointment);
          }}
          className="marginTopMedium"
          control={
            <Checkbox checked={formik.values.phoneAppointment} />
          }
          label="Phone Appointments"
          sx={{ margin: 0, marginTop: '0 !important', width: '100%' }}
          disabled={Boolean(enquiry)}
        />
      </div>
      {
        enquiry
        && (
          <>
            <Divider sx={{
              marginTop: '16px',
              '&::before, ::after': {
                position: 'static',
              },
            }}
            >
              <Chip label="Solicitor Information" color="primary" />
            </Divider>
            <div className="flex row marginTopMedium marginBottomMedium">
              <div className="marginRightMedium" style={{ width: '50%' }}>
                <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
                <OutlinedInput
                  id="input-with-icon-adornment"
                  name="solicitorName"
                  fullWidth
                  color="primary"
                  value={enquiry.user.name}
                  disabled
                />
              </div>
              <div style={{ width: '50%' }}>
                <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                <OutlinedInput
                  id="input-with-icon-adornment"
                  name="solicitorEmail"
                  fullWidth
                  color="primary"
                  value={enquiry.user.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled
                />
              </div>
            </div>
            <div>
              <InputLabel htmlFor="input-with-icon-adornment">Enquiry Creation Date</InputLabel>
              <OutlinedInput
                id="input-with-icon-adornment"
                name="solicitorEnquiryDate"
                fullWidth
                color="primary"
                value={convertToDateTime(enquiry.createdAt)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled
              />
            </div>
          </>
        )
      }
      {
        !enquiry
        && (
          <Tooltip title={enquiryButtonDisabled ? 'You do not have the required permissions to create an enuiry' : ''}>
            <div>
              <Button
                sx={{ height: '48px' }}
                fullWidth
                variant="contained"
                type="submit"
                className="marginTop"
                disabled={Boolean(enquiry) || enquiryButtonDisabled || !formik.isValid}
              >
                Submit enquiry
              </Button>
            </div>
          </Tooltip>
        )
      }
      <BackdropLoader open={loading} />
    </form>
  );
};

export default Enquiry;
