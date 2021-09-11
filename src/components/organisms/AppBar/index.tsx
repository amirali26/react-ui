import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AccountBalanceOutlined,
  AccountBoxOutlined,
  AccountCircleOutlined,
  AddBoxOutlined,
  ExitToAppOutlined,
} from '@material-ui/icons';
import clsx from 'clsx';
import {
  AppBar, Button, IconButton, makeStyles, Menu, MenuItem, Toolbar,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import useAuth from '../../../pages/Auth/useAuth';
import Logo from '../../atoms/Logo';
import Modal from '../../molecules/modal';
import CreateAccountForm from '../Accounts/CreateAccount/Form';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface IProps {
  handleOpen: (open: boolean) => void;
}

const NavigationAppBar: React.FC<IProps> = ({ handleOpen }: IProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [addAccountOpen, setAddAccountOpen] = React.useState<boolean>(false);
  const { handleLogout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => handleOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <div className={clsx(classes.title)}>
            <Logo width={200} />
          </div>
          <Button className="marginRightMedium" color="inherit" startIcon={<AccountCircleOutlined />} onClick={handleClick}>Profile</Button>
          <Button color="primary" variant="contained" startIcon={<AccountBalanceOutlined />}>Switch Account</Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <AccountBoxOutlined className="marginRightSmall" />
              My Profile
            </MenuItem>
            <MenuItem onClick={() => {
              handleClose();
              setAddAccountOpen(true);
            }}
            >
              <AddBoxOutlined className="marginRightSmall" />
              Add Account
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToAppOutlined className="marginRightSmall" />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Modal open={addAccountOpen} handleClose={() => setAddAccountOpen(false)}>
        <CreateAccountForm />
      </Modal>
    </div>
  );
};

export default NavigationAppBar;
