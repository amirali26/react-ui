import { faBars, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'helpmycase-storybook/dist/components/Button';
import {
  makeStyles, AppBar, Toolbar, IconButton, Typography,
} from 'helpmycase-storybook/dist/components/External';
import React from 'react';

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

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => handleOpen(true)}>
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            HelpMyCase
          </Typography>
          <Button color="inherit" startIcon={<FontAwesomeIcon icon={faSignInAlt} />}>Login</Button>
          <Button color="primary" variant="contained" startIcon={<FontAwesomeIcon icon={faUserPlus} />}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationAppBar;
