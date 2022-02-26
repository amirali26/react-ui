import {
  useLazyQuery, useMutation, useQuery, useReactiveVar,
} from '@apollo/client';
import {
  AddCircleOutline,
  BadgeOutlined, Delete, EmailOutlined, LanguageOutlined,
} from '@mui/icons-material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useFormik } from 'formik';
import {
  Autocomplete,
  Box,
  Button, Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel, InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem, Select,
  SelectChangeEvent,
  TextField,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import * as Yup from 'yup';
import useHelpmycaseSnackbar from '../../../../../hooks/useHelpmycaseSnackbar';
import { Account, AccountPermission, AccountType } from '../../../../../models/account';
import AccountUserInvitation, { AccountUserInvitationStatus } from '../../../../../models/accountUserInvitation';
import { AreasOfLegalPractice } from '../../../../../models/areas-of-legal-practice';
import { User } from '../../../../../models/user';
import { REJECT_ACCOUNT_USER_INVITATION } from '../../../../../mutations/acceptOrRejectAccountUserInvitation';
import { ADD_ACCOUNT } from '../../../../../mutations/account';
import { UserAccount, userVar } from '../../../../../pages/Dashboard';
import { GET_ACCOUNT } from '../../../../../queries/account';
import GET_AREASOFLEGALPRACTICE from '../../../../../queries/areas-of-legal-practice';
import convertToDateTime from '../../../../../utils/datetime';
import InviteUsersModal from '../../../../molecules/InviteUsersModal';
import Title from '../../../../molecules/Title';

type InitialValues = {
  name: string,
  email: string,
  phoneNumber: string,
  website: string,
  type: AccountType,
  registeredDate: string,
  handledAreasOfPractice: string[],
  invitedUserEmails?: string[],
  activeUsers?: User[],
  pendingInvitations?: AccountUserInvitation[],
  postCode: string,
  address: string,
  region: string,
  areaInRegion: string,
}

const initialValues: InitialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  website: '',
  type: AccountType.LONDON_LARGE_COMMERCIAL,
  handledAreasOfPractice: [],
  registeredDate: '',
  postCode: '',
  address: '',
  areaInRegion: '',
  region: '',
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
  users: Yup.array().of(Yup.string().email('Please provide a valid email address')),
  registeredDate: Yup.date().required('Please provide a incorporation date for your firm'),
  invitedUserEmails: Yup.array().of(Yup.string().email('Invalid Email')),
  address: Yup.string().required('Please provide an address').max(100, 'Address too long').min(6, 'Address too short'),
  postCode: Yup.string().required('Please provide a postcode').max(10, 'Postcode too long'),
  region: Yup.string().required(),
  areaInRegion: Yup.string().required(),
});

interface IProps {
  callback?: () => void;
  readonly?: true
  accountInformation?: InitialValues;
}

const Form: React.FC<IProps> = ({ callback, readonly, accountInformation }: IProps) => {
  const sb = useHelpmycaseSnackbar();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [options, setOptions] = React.useState<string[]>([]);
  const user = useReactiveVar(userVar);
  const legalPracticeQuery = useQuery<{
    areasOfPractices: AreasOfLegalPractice[]
  }>(GET_AREASOFLEGALPRACTICE, {
    fetchPolicy: 'cache-and-network',
  });

  const [accountInformationQuery] = useLazyQuery<{ userAccount: Account }[]>(GET_ACCOUNT, {
    onCompleted: (data) => {
      if (data.length) {
        userVar({
          ...user,
          selectedAccount: data[0].userAccount,
          accountUserInvitations: data[0].userAccount.accountUserInvitations,
        });
      }
    },
  });
  const [deleteRequest] = useMutation(REJECT_ACCOUNT_USER_INVITATION, {
    onCompleted: () => {
      accountInformationQuery({
        variables: {
          accountId: user.selectedAccount?.id,
        },
      });
      sb.trigger('Deleted invitation', 'info');
    },
  });
  const [addAccount, { loading, error }] = useMutation<{ addAccount: Account }>(ADD_ACCOUNT, {
    onCompleted: (data) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      updateUserVar(data.addAccount);
      accountInformationQuery({
        variables: {
          accountId: user.selectedAccount?.id,
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: readonly && accountInformation ? accountInformation : initialValues,
    validateOnMount: true,
    onSubmit: async (values) => {
      try {
        addAccount({
          variables: {
            accountInput: {
              ...values,
              areasOfPracticeId: values.handledAreasOfPractice,
              invitedUserEmails: values.invitedUserEmails || [],
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
    sb.trigger('Firm successfully created', 'success');
    if (callback) {
      callback();
    }
  }

  const handleAutoComplete = async (postcode: string) => {
    const response = await (await fetch(`https://api.postcodes.io/postcodes/${postcode}/autocomplete`)).json();
    setOptions(response.result || []);
  };

  const handlePostcodeSelect = async (postcode: string) => {
    const response = await (await fetch(`https://api.postcodes.io/postcodes/${postcode}`)).json();
    if (!response.error) {
      formik.setFieldValue('postCode', postcode);
      formik.setFieldValue('areaInRegion', response.result.primary_care_trust);
      formik.setFieldValue('region', response.result.region);
    }
  };

  const shouldShowUsers = readonly && accountInformation
    && (accountInformation.activeUsers
      || accountInformation.pendingInvitations
    ) && user.selectedAccount?.permission === AccountPermission.ADMIN;

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '600px' }} className="flex column spaceBetween">
      <div style={{ padding: 8 }}>
        <Title
          title={readonly ? 'Firm Information' : 'Register Firm'}
          subtitle={
            readonly
              ? 'A detailed description of the registered details for the selected firm'
              : 'Register your firm with your user, and add existing users to it. Your firm will be visible to clients whenever you make an enquiry.'
          }
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
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              disabled={readonly}
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
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled={readonly}
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
              value={formik.values.phoneNumber}
              disabled={readonly}
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
              value={formik.values.website}
              disabled={readonly}
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
                disabled={readonly}
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
                disabled={readonly}
                onChange={(newValue) => {
                  formik.setFieldValue('registeredDate', newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <div style={{ width: '47%', padding: 8 }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopSmall">Post Code</InputLabel>
            <Autocomplete
              sx={{ marginBottom: '16px' }}
              disablePortal
              id="combo-box-demo"
              options={options}
              fullWidth
              onChange={(e, newValue) => {
                if (newValue) {
                  handlePostcodeSelect(newValue);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Postcode"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                  }}
                />
              )}
              onInputChange={(event) => handleAutoComplete((event.target as any).value as string)}
            />

          </div>
          <div style={{ width: '47%', padding: 8 }}>
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall marginTopSmall">Address</InputLabel>
            <TextField
              id="input-with-icon-adornment"
              name="address"
              fullWidth
              color="primary"
              helperText={formik.touched.address && formik.errors.address}
              error={Boolean(formik.touched.address && formik.errors.address)}
              value={formik.values.address}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              disabled={readonly}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="marginTopMedium flex row">
          <div style={{
            width: shouldShowUsers ? '47%' : '100%',
            padding: '8px',
          }}
          >
            <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Handled Areas of Practice</InputLabel>
            <div style={{
              border: '1px solid #5e5e5e44',
              borderRadius: '5px',
              height: '310px',
            }}
            >
              {
                legalPracticeQuery.data?.areasOfPractices.map((aolp: AreasOfLegalPractice) => (
                  <FormControlLabel
                    key={aolp.id}
                    checked={formik.values.handledAreasOfPractice.includes(aolp.id)}
                    disabled={readonly}
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
          {
            shouldShowUsers
            && (
              <div style={{
                width: '47%',
                padding: '8px',
              }}
              >
                <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Users</InputLabel>
                <List
                  sx={{
                    overflow: 'auto',
                    height: 300,
                    border: '1px solid #5e5e5e44',
                    borderRadius: '5px',
                    '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  {
                    accountInformation.activeUsers && accountInformation.activeUsers.length > 0 && (
                      <li>
                        <ul>
                          <ListSubheader>Active Users</ListSubheader>
                          {accountInformation.activeUsers.map((item) => (
                            <ListItem key={item.email}>
                              <ListItemText
                                primary={item.email}
                                secondary={item.name}
                              />
                            </ListItem>
                          ))}
                        </ul>
                      </li>
                    )
                  }
                  <li>
                    <ul>
                      <ListSubheader>Active Invitations</ListSubheader>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => setOpenModal(true)}>
                          <AddCircleOutline sx={{ marginRight: '8px' }} />
                          Invite More Users
                        </ListItemButton>
                      </ListItem>
                      {accountInformation.pendingInvitations?.filter(
                        (i) => i.status === AccountUserInvitationStatus.PENDING,
                      ).map(
                        (item) => (
                          <ListItem key={item.userEmail} disablePadding>
                            <ListItemButton onClick={() => deleteRequest({
                              variables: {
                                str: item.userEmail,
                              },
                            })}
                            >
                              <ListItemText
                                primary={item.userEmail}
                                secondary={convertToDateTime(item.createdAt)}
                              />
                              <Delete />
                            </ListItemButton>
                          </ListItem>
                        ),
                      )}
                    </ul>
                  </li>
                </List>
              </div>
            )
          }
        </div>
      </div>
      {
        !readonly && (
          <div style={{
            width: '100%', padding: 8,
          }}
          >
            <Autocomplete
              multiple
              id="tags-filled"
              freeSolo
              options={[]}
              value={formik.values.invitedUserEmails}
              onChange={(event, newValue) => {
                formik.setFieldValue('invitedUserEmails', newValue);
              }}
              renderTags={(value: readonly unknown[], getTagProps) => value.map((
                option: unknown, index: number,
              ) => (
                <Chip variant="filled" label={option as string} {...getTagProps({ index })} key={option as string} />
              ))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={
                    formik.touched.invitedUserEmails
                    && formik.errors.invitedUserEmails?.length
                    && formik.errors.invitedUserEmails[0]
                  }
                  error={
                    Boolean(
                      formik.touched.invitedUserEmails
                      && formik.errors.invitedUserEmails,
                    )
                  }
                  placeholder="Invite Users To Account"
                />
              )}
            />
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
          </div>
        )
      }
      <InviteUsersModal
        key={`${openModal}`}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </form>
  );
};

export default Form;
