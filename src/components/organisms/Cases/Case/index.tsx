import {
  Button, InputLabel, TextField, Tooltip, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { AccountPermission } from '../../../../models/account';
import { RequestDto } from '../../../../models/request';
import { userVar } from '../../../../pages/Dashboard';
import convertToDateTime from '../../../../utils/datetime';
import Title from '../../../molecules/Title';

type IProps = RequestDto & {
  style?: React.CSSProperties,
  readonly?: boolean,
  handleEnquiryClick: () => void
};

const Case: React.FC<IProps> = ({
  topic,
  name,
  phoneNumber,
  email,
  description,
  createdDate,
  requestNumber,
  style,
  readonly,
  handleEnquiryClick,
}) => {
  const user = userVar();

  const enquiryButtonDisabled = !user.selectedAccount?.permission
    || user.selectedAccount.permission === AccountPermission.READ_ONLY;
  return (
    <div className="flex spaceBetween column" style={{ height: '100%', ...style }}>
      <Title
        title="Case"
        subtitle="View information relating to a specific clients case"
      />
      <div className="fullWidth">
        <Typography className="marginBottom">
          Case Number:
          <b>
            {`  #CA${(`000000${requestNumber}`).slice(-4)}`}
          </b>
        </Typography>
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Topic</InputLabel>
        <TextField
          id="input-with-icon-adornment"
          name="name"
          fullWidth
          color="primary"
          value={topic}
          disabled
          className="marginBottomSmall"
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Name</InputLabel>
        <TextField
          id="input-with-icon-adornment"
          name="name"
          fullWidth
          color="primary"
          value={name}
          disabled
          className="marginBottomSmall"
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Phone Number</InputLabel>
        <TextField
          id="input-with-icon-adornment"
          name="name"
          fullWidth
          color="primary"
          value={phoneNumber}
          disabled
          className="marginBottomSmall"
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Email</InputLabel>
        <TextField
          id="input-with-icon-adornment"
          name="name"
          fullWidth
          color="primary"
          value={email}
          disabled
          className="marginBottomSmall"
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Description</InputLabel>
        <TextField
          id="input-with-icon-adornment"
          name="name"
          fullWidth
          color="primary"
          multiline
          maxRows={20}
          value={description}
          disabled
          className="marginBottomSmall"
        />
        <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Created Date</InputLabel>
        <TextField
          id="input-with-icon-adornment"
          name="name"
          fullWidth
          color="primary"
          value={convertToDateTime(createdDate)}
          disabled
          className="marginBottomSmall"
        />
      </div>
      {
        readonly === false && (
          <Tooltip title={enquiryButtonDisabled ? 'You do not have the required permissions to create an enquiry' : ''}>
            <div>
              <Button
                sx={{ height: '48px' }}
                className="marginTop"
                fullWidth
                variant="contained"
                disabled={enquiryButtonDisabled}
                onClick={handleEnquiryClick}
              >
                Make an enquiry
              </Button>
            </div>
          </Tooltip>
        )
      }
    </div>
  );
};

export default Case;
