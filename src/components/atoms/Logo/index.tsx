import { Styles } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import logoPNG from '../../../assets/images/logoPNG.png';
import history from '../../../utils/routes/history';

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
    <button
      className={styles.logo}
      style={{
        width, backgroundColor: 'transparent', border: 0, cursor: 'pointer',
      }}
      type="button"
      onClick={() => history.push('/dashboard')}
    >
      <img src={logoPNG} alt="HelpMyCase logo" />
    </button>
  );
};

export default Logo;
