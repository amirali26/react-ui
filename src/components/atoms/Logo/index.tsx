import { makeStyles } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import logoPNG from '../../../assets/images/logoPNG.png';

const useStyles = makeStyles({
  logo: {
    width: '256px',
    height: 'auto',
    position: 'relative',
    '& img': {
      position: 'relative',
      width: '100%',
      height: 'auto',
    },
  },
});

const Logo: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.logo}>
      <img src={logoPNG} alt="HelpMyCase logo" />
    </div>
  );
};

export default Logo;
