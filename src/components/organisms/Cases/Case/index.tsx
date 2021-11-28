import { InputLabel, TextField } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { RequestDto } from '../../../../models/request';
import convertToDateTime from '../../../../utils/datetime';

type IProps = RequestDto;

const Case: React.FC<IProps> = ({
  id,
  topic,
  name,
  phoneNumber,
  email,
  status,
  enquiry,
  createdDate,
}) => {
  const x = 2;
  return (
    <div className="fullWidth">
      <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Topic</InputLabel>
      <TextField
        id="input-with-icon-adornment"
        name="name"
        fullWidth
        color="primary"
        value={topic}
        disabled
      />
      <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Name</InputLabel>
      <TextField
        id="input-with-icon-adornment"
        name="name"
        fullWidth
        color="primary"
        value={name}
        disabled
      />
      <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Phone Number</InputLabel>
      <TextField
        id="input-with-icon-adornment"
        name="name"
        fullWidth
        color="primary"
        value={phoneNumber}
        disabled
      />
      <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Email</InputLabel>
      <TextField
        id="input-with-icon-adornment"
        name="name"
        fullWidth
        color="primary"
        value={email}
        disabled
      />
      <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Status</InputLabel>
      <TextField
        id="input-with-icon-adornment"
        name="name"
        fullWidth
        color="primary"
        value={status}
        disabled
      />
      <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Enquiry</InputLabel>
      <TextField
        id="input-with-icon-adornment"
        name="name"
        fullWidth
        color="primary"
        value={enquiry}
        disabled
      />
      <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">Created Date</InputLabel>
      <TextField
        id="input-with-icon-adornment"
        name="name"
        fullWidth
        color="primary"
        value={convertToDateTime(createdDate)}
        disabled
      />
    </div>
  );
};

export default Case;
