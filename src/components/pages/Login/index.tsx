import { makeStyles } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import BackgroundImage from '../../../assets/images/login-background.png';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: -1,
    background: `url(${BackgroundImage})`,
    backgroundSize: '',
  },
});

const Login = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      hi
    </div>
  );
};

export default Login;
