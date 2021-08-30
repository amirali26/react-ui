import Auth from '@aws-amplify/auth/lib';
import { useState } from 'react';
import { string } from 'yup/lib/locale';
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
          verify: true,
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

      await user.confirmRegistration(code, false, (err) => {
        if (err) throw Error(err.message);
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
      const result = await Auth.confirmSignIn(user, code);
      setUser(result);
      history.push('/dashboard');
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

      await user.resendConfirmationCode((err, _) => {
        if (err) throw Error(err.message);
      });
    } catch (e) {
      sb.trigger(e.message || 'There was an issue');
      history.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const triggerForgotPassword = async (email: string) => {
    try {
      await Auth.forgotPassword(email);
      history.push('/auth/reset-password/confirm', {
        email,
      });
    } catch (e) {
      sb.trigger(e.message);
    }
  };

  const triggerForgotPasswordSubmit = async (email: string, code: string, password: string) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      history.push('/auth/login');
      sb.trigger('Password successfully reset', 'info');
    } catch (e) {
      sb.trigger(e.message || 'There was an issue');
    }
  };

  const isLoggedIn = async () => {
    const response = await Auth.currentUserInfo();

    if (response) return true;
    return false;
  };

  return {
    loading,
    signIn,
    signUp,
    confirmSignUp,
    resendConfirmationCode,
    verifyMfa,
    triggerForgotPassword,
    triggerForgotPasswordSubmit,
    isLoggedIn,
  };
};

export default useAuth;
