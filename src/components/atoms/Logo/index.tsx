import { Styles } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import logoPNG from '../../../assets/images/logoPNG.png';

const useStyles = Styles.makeStyles({
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

interface IProps {
  width?: number;
}

const Logo: React.FC<IProps> = ({ width }: IProps) => {
  const styles = useStyles();
  return (
    <div className={styles.logo} style={{ width }}>
      <img src={logoPNG} alt="HelpMyCase logo" />
    </div>
  );
};

export default Logo;
