import { faFacebookF, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { IconButton, makeStyles, Typography } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import WelcomeBackgroundImage from '../../assets/images/homepage-main.jpg';
import BackgroundImage from '../../assets/images/login-background.png';
import Logo from '../../components/atoms/Logo';
import Login from './Login';

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
  },
  card: {
    width: '1200px',
    backgroundColor: 'rgba(255,255,255,1)',
    boxShadow: '0 0 20px 2px #000',
    '& > div': {
      width: '50%',
      padding: '64px 32px',
    },
  },
  welcome: {
    background: `url(${WelcomeBackgroundImage}) center center`,
    backgroundSize: 'cover',
    color: 'white',
  },
  form: {
    color: 'black',
    width: '50%',
    borderRadius: '5px',
    '& > form': {
      width: '400px',
    },
  },
});

const Auth: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={clsx(styles.card, 'flex row spaceBetween')}>
        <div className={styles.welcome}>
          <div className="flex column center alignCenter fullHeight textAlignCenter">
            <Logo />
            <Typography variant="h4" className="marginTopMedium">
              Helping you to find trusted solicitors tailored to your legal case.
            </Typography>
            <Typography variant="subtitle1" className="marginTopMedium">
              Finding a trusted solicitor to handle your case is usually a big headache.
              HelpMyCase streamlines the process of finding the perfect
              solicitor tailored to your case for free!
            </Typography>
          </div>
        </div>
        <div className={clsx(styles.form, 'flex column center')}>
          <Login />
          <div className="marginTop">
            <IconButton color="primary">
              <FontAwesomeIcon icon={faFacebookF} />
            </IconButton>
            <IconButton color="primary" className="marginLeftSmall marginRightSmall">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </IconButton>
            <IconButton color="primary">
              <FontAwesomeIcon icon={faTwitter} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
