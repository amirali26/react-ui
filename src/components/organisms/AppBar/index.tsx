import { useReactiveVar } from '@apollo/client';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AccountBalanceOutlined, AccountCircleOutlined,
} from '@mui/icons-material';
import clsx from 'clsx';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Styles,
  Theme,
  Toolbar,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../pages/Auth/useAuth';
import { userVar } from '../../../pages/Dashboard';
import Logo from '../../atoms/Logo';
import Drawer from '../../molecules/Drawer';
import AccountInvitation from '../Accounts/AccountInvitation';
import CreateAccountForm from '../Accounts/CreateAccount/Form';
import SwitchAccount from '../Accounts/SwitchAccount';
import UserInformation from '../User/UserInformation';

export const useStyles = Styles.makeStyles((theme: Theme) => ({
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
  const [accountInvitationOpen, setAccountInvitationOpen] = React.useState<boolean>(false);
  const [userProfileOpen, setUserProfileOpen] = React.useState<boolean>(false);
  const {
    user, selectedAccount, accountUserInvitations, accounts,
  } = useReactiveVar(userVar);

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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => handleOpen(true)}
          >
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
            {user ? user.name.toUpperCase() : 'Profile'}
          </Button>
          {
            Boolean(accounts?.length) && (
              <Button
                color="primary"
                variant="contained"
                startIcon={<AccountBalanceOutlined />}
                onClick={() => {
                  handleClose();
                  setSwitchAccountOpen(true);
                }}
              >
                Switch Firm
                {selectedAccount && ` - ${selectedAccount.name}`}
              </Button>
            )
          }
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setUserProfileOpen(true);
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setAddAccountOpen(true);
              }}
            >
              Add Firm
            </MenuItem>
            {
              Boolean(accounts?.length)
              && (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setAccountInformationOpen(true);
                  }}
                >
                  Firm Information
                </MenuItem>
              )
            }
            <MenuItem
              onClick={() => {
                handleClose();
                setAccountInvitationOpen(true);
              }}
              sx={{
                paddingRight: '40px',
              }}
            >
              Firm Invitations
              <Badge badgeContent={accountUserInvitations?.length || 0} color="primary" sx={{ left: '15px', top: '1px' }} />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer open={userProfileOpen} onClose={() => setUserProfileOpen(false)}>
        <UserInformation />
      </Drawer>
      <Drawer open={addAccountOpen} onClose={() => setAddAccountOpen(false)}>
        <CreateAccountForm callback={() => setAddAccountOpen(false)} />
      </Drawer>
      <Drawer
        open={switchAccountOpen}
        onClose={() => setSwitchAccountOpen(false)}
      >
        <SwitchAccount callback={() => setSwitchAccountOpen(false)} />
      </Drawer>
      <Drawer
        open={accountInformationOpen}
        onClose={() => {
          setAccountInformationOpen(false);
        }}
      >
        {selectedAccount && (
          <CreateAccountForm
            accountInformation={{
              ...selectedAccount,
              type: selectedAccount.size,
              handledAreasOfPractice: selectedAccount.areasOfPractice.map((aop) => aop.id),
              activeUsers: selectedAccount.users,
              pendingInvitations: selectedAccount.accountUserInvitations,
            }}
            readonly
          />
        )}
      </Drawer>
      <Drawer
        open={accountInvitationOpen}
        onClose={() => setAccountInvitationOpen(false)}
      >
        <AccountInvitation />
      </Drawer>
    </div>
  );
};

export default NavigationAppBar;
