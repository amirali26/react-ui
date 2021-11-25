import { InboxOutlined, MailOutline } from '@mui/icons-material';
import {
  Box, Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import history from '../../../utils/routes/history';

const routes: {name: string, route: string}[] = [
  {
    name: 'Dashboard',
    route: '/dashboard/cases',
  },
  {
    name: 'User Profile',
    route: '/dashboard/user-settings',
  },
  {
    name: 'Logout',
    route: '/dashboard/logout',
  },
];

interface IProps {
    open: boolean;
    handleOpen: (open: boolean) => void;
}

const list = (handleClose: () => void) => (
  <Box
    role="presentation"
  >
    <List>
      {routes.map((route, index) => (
        <ListItem
          button
          key={route.name}
          onClick={() => {
            history.push(route.route);
            handleClose();
          }}
        >
          <ListItemIcon>
            {index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}
          </ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItem>
      ))}
    </List>
    {/* <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List> */}
  </Box>
);

export const NavigationSideBar: React.FC<IProps> = ({
  open,
  handleOpen,
}: IProps) => (
  <SwipeableDrawer
    sx={{
      '& .MuiButtonBase-root': {
        paddingRight: '30px',
      },
    }}
    open={open}
    onClose={() => handleOpen(false)}
    onOpen={() => handleOpen(true)}
    color="primary"
  >
    {list(() => handleOpen(false))}
  </SwipeableDrawer>

);

export default NavigationSideBar;
