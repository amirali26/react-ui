import { PersonAddOutlined } from '@material-ui/icons';
import {
  Button, Checkbox, FormControlLabel, Input, InputLabel, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import FormTitle from '../../../components/molecules/auth/FormTitle';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>();

  return (
    <form>
      <FormTitle
        title="Create account"
        subtitle={'Manage your clients effectively. Let\'s get you all set up so you can start in no time!'}
      />
      <div className="flex row spaceBetween fullWidth">
        <div className="fullWidth marginTop marginRightMedium">
          <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
            First Name
            {' '}
            <span className="red">*</span>
          </InputLabel>
          <Input
            required
            id="input-with-icon-adornment"
            fullWidth
            color="primary"
          />
        </div>
        <div className="fullWidth marginTop">
          <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
            Last Name
            {' '}
            <span className="red">*</span>
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            fullWidth
            color="primary"
            type={showPassword ? 'text' : 'password'}
          />
        </div>
      </div>
      <div className="flex row spaceBetween fullWidth">
        <div className="fullWidth marginTop marginRightMedium">
          <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
            Phone Number
            {' '}
            <span className="red">*</span>
          </InputLabel>
          <Input
            required
            id="input-with-icon-adornment"
            fullWidth
            color="primary"
          />
        </div>
        <div className="fullWidth marginTop">
          <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
            Email
            {' '}
            <span className="red">*</span>
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            fullWidth
            color="primary"
            type={showPassword ? 'text' : 'password'}
          />
        </div>
      </div>
      <div className="flex row spaceBetween fullWidth">
        <div className="fullWidth marginTop marginRightMedium">
          <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
            Password
            {' '}
            <span className="red">*</span>
          </InputLabel>
          <Input
            required
            id="input-with-icon-adornment"
            fullWidth
            color="primary"
          />
        </div>
        <div className="fullWidth marginTop">
          <InputLabel htmlFor="input-with-icon-adornment" className="marginBottomSmall">
            Confirm Password
            {' '}
            <span className="red">*</span>
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            fullWidth
            color="primary"
            type={showPassword ? 'text' : 'password'}
          />
        </div>
      </div>
      <FormControlLabel
        className="marginTopMedium"
        control={<Checkbox checked={false} name="gilad" />}
        label="Yes, I want to receive emails from potential clients"
      />
      <br />
      <FormControlLabel
        control={<Checkbox checked name="gilad" />}
        label="I agree to all the Terms and Privacy Policy"
      />
      <Button
        variant="contained"
        color="primary"
        className="marginTopMedium fullWidth"
        startIcon={<PersonAddOutlined />}
      >
        Register
      </Button>
      <div className="marginTopMedium fullWidth textAlignLeft">
        <Typography variant="subtitle1">
          Already have an account?
          {' '}
          <NavLink className="underline red" to="/auth/login">Go to login</NavLink>
        </Typography>
      </div>
    </form>
  );
};

export default Register;
