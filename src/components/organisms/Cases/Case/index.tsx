import { Button, InputLabel, TextField } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { RequestDto } from '../../../../models/request';
import convertToDateTime from '../../../../utils/datetime';

type IProps = RequestDto;

const Case: React.FC<IProps> = ({
  topic,
  name,
  phoneNumber,
  email,
  description,
  createdDate,
}) => {
  const x = 2;
  return (
    <div className="flex spaceBetween column" style={{ height: '100%' }}>
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
      <Button
        sx={{ height: '48px' }}
        fullWidth
        variant="contained"
      >
        Make an enquiry
      </Button>
    </div>
  );
};

export default Case;
