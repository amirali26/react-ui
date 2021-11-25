import { useReactiveVar } from '@apollo/client';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AccountBalanceOutlined,
  AccountBoxOutlined,
  AccountCircleOutlined,
  AddBoxOutlined,
  ExitToAppOutlined,
  HelpOutline,
} from '@mui/icons-material';
import clsx from 'clsx';
import {
  AppBar, Button, IconButton, Menu, MenuItem, Styles, Toolbar,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../pages/Auth/useAuth';
import { userVar } from '../../../pages/Dashboard';
import Logo from '../../atoms/Logo';
import Drawer from '../../molecules/Drawer';
import Modal from '../../molecules/modal';
import AccountInformation from '../Accounts/AccountInformation';
import CreateAccountForm from '../Accounts/CreateAccount/Form';
import SwitchAccount from '../Accounts/SwitchAccount';

const useStyles = Styles.makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: '16px',
  },
}));

interface IProps {
  handleOpen: (open: boolean) => void;
}

const NavigationAppBar: React.FC<IProps> = ({ handleOpen }: IProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [addAccountOpen, setAddAccountOpen] = React.useState<boolean>(false);
  const [switchAccountOpen, setSwitchAccountOpen] = React.useState<boolean>(false);
  const [accountInformationOpen, setAccountInformationOpen] = React.useState<boolean>(false);
  const { user, selectedAccount } = useReactiveVar(userVar);
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
          <Button
            className="marginRightMedium"
            color="inherit"
            startIcon={<AccountCircleOutlined />}
            onClick={handleClick}
          >
            {user ? user.name.toUpperCase() : 'Profile' }
          </Button>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AccountBalanceOutlined />}
            onClick={() => {
              handleClose();
              setSwitchAccountOpen(true);
            }}
          >
            Switch Account
            { selectedAccount && ` - ${selectedAccount.name}`}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={Link}
              onClick={handleClose}
              to="/dashboard/user-settings"
            >
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
            <MenuItem onClick={() => {
              handleClose();
              setAccountInformationOpen(true);
            }}
            >
              <HelpOutline className="marginRightSmall" />
              Account Information
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToAppOutlined className="marginRightSmall" />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer open={addAccountOpen} onClose={() => setAddAccountOpen(false)}>
        <CreateAccountForm callback={() => setAddAccountOpen(false)} />
      </Drawer>
      <Modal open={switchAccountOpen} handleClose={() => setSwitchAccountOpen(false)}>
        <SwitchAccount callback={() => setSwitchAccountOpen(false)} />
      </Modal>
      <Modal open={accountInformationOpen} handleClose={() => setAccountInformationOpen(false)}>
        <AccountInformation />
      </Modal>
    </div>
  );
};

export default NavigationAppBar;
