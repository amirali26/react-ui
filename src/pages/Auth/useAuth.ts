import Auth from '@aws-amplify/auth/lib';
import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useHelpmycaseSnackbar from '../../hooks/useHelpmycaseSnackbar';
import history from '../../utils/routes/history';

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const sb = useHelpmycaseSnackbar();
  const { user, setUser } = useAuthContext();

  const signIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      const userResponse = await Auth.signIn(username, password);
      if (userResponse) setUser(userResponse);
      history.push('/auth/verify');
    } catch (e) {
      sb.trigger(e.message || 'Something went wrong with signing you in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number: `+44${phoneNumber}`,
        },
      });

      if (response.user) setUser(response.user);
      if (response.codeDeliveryDetails) {
        history.push('/auth/verify', {
          confirm: true,
        });
      }
      sb.trigger('Account successfully created - please verify your account', 'success');
    } catch (e) {
      if (e.message === 'Unable to get logged in user session') history.push('/auth/login');
      sb.trigger(e.message || 'Something went wrong signing you up');
    } finally {
      setLoading(false);
    }
  };

  const confirmSignUp = async (code: string) => {
    try {
      setLoading(true);

      if (!user) throw Error('Unable to get logged in user session');

      await user.confirmRegistration(code, false, (err, result) => {
        if (err) throw Error(err);
        console.log(result);
        setUser(result);
        history.push('/dashboard');
      });
    } catch (e) {
      sb.trigger(e.message || 'Something went wrong confirming your sign up');
      history.push('/auth/signup');
    } finally {
      setLoading(false);
    }
  };

  const verifyMfa = async (code: string) => {
    try {
      setLoading(true);

      if (!user) throw Error('Unable to get logged in user session');

      const result = await Auth.verifyTotpToken(await Auth.userSession(user), code);
      console.log(result);
    } catch (e) {
      sb.trigger(e.message || 'Something went wrong when verifying your MFA');
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmationCode = async () => {
    try {
      setLoading(true);

      if (!user) throw Error('Unable to get logged in user session');

      await user?.resendConfirmationCode((err, _) => {
        if (err) throw Error(err.message);
      });
    } catch (e) {
      sb.trigger(e.message);
      history.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    signIn,
    signUp,
    confirmSignUp,
    resendConfirmationCode,
    verifyMfa,
  };
};

export default useAuth;
