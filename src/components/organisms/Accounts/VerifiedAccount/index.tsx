import { useMutation } from '@apollo/client';
import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { Button, Styles } from 'helpmycase-storybook/dist/components/External';
import { sumBy } from 'lodash';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackgroundImage from '../../../../assets/images/login-background.png';
import useHelpmycaseSnackbar from '../../../../hooks/useHelpmycaseSnackbar';
import VERIFY_ACCOUNT from '../../../../mutations/verifyAccount';
import history from '../../../../utils/routes/history';
import BackdropLoader from '../../../molecules/backdropLoader';
import BigMessage from '../../../molecules/bigMessage';

const useStyles = Styles.makeStyles({
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
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    boxShadow: '0 0 20px 2px #000',
    padding: '40px',
  },
  form: {
    color: 'black',
    width: '50%',
    borderRadius: '5px',
    '& > form': {
      width: '500px',
    },
  },
});

const VerifiedAccount = () => {
  const styles = useStyles();
  const params: { id?: string } = useParams();
  const [mutateVerifyAccount, { error, loading }] = useMutation(VERIFY_ACCOUNT, {
    onError: () => 'Errored',
  });
  const title = error?.message ? 'Error Verifying Firm' : 'Firm Verified';
  const subtitle = error?.message
    ? 'There was an error verifying your firm'
    : 'You have successfully verified your firm. You are now able to use it to contact potential clients.';
  useEffect(() => {
    if (params.id) {
      mutateVerifyAccount({
        variables: {
          aid: params.id,
        },
      });
    }
  }, []);

  return (
    <div className={styles.root}>
      <BackdropLoader open={loading} />
      {
        !loading && (
          <div className={styles.card}>
            <BigMessage
              icon={error?.message ? <CancelOutlined /> : <CheckCircleOutline />}
              title={title}
              subtitle={subtitle}
              variant="drawer"
              style={{
                top: '35%',
                position: 'relative',
                padding: 0,
                width: '350px',
              }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={() => history.push('/auth/login')}
            >
              Take me to login
            </Button>
          </div>
        )
      }
    </div>
  );
};

export default VerifiedAccount;
