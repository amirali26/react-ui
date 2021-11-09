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
      history.push('/auth/verify', {
        verify: false,
      });
    } catch (e: any) {
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
    firstName: string,
    lastName: string,
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number: `+44${phoneNumber}`,
          name: `${firstName} ${lastName}`,
          birthdate: '15/04/1996',
        },
      });

      if (response.user) setUser(response.user);
      if (response.codeDeliveryDetails) {
        history.push('/auth/verify-email', {
          verify: true,
          username,
          password,
        });
      }
    } catch (e: any) {
      if (e.message === 'Unable to get logged in user session') history.push('/auth/login');
      sb.trigger(e.message || 'Something went wrong signing you up');
    } finally {
      setLoading(false);
    }
  };

  const confirmSignUp = async (code: string, username: string, password: string) => {
    try {
      setLoading(true);

      if (!user) throw Error('Unable to get logged in user session');

      user.confirmRegistration(code, false, (err) => {
        if (err) {
          sb.trigger(err.message || 'Something went wrong confirming your sign up');
        }
      });

      await signIn(username, password);
    } catch (e: any) {
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
    } catch (e: any) {
      sb.trigger(e.message || 'Something went wrong when verifying your MFA');
    } finally {
      setLoading(false);
    }
  };

  const resendSignUpEmail = async () => {
    try {
      if (!user) throw Error('Unable to get logged in user session');

      const response = await Auth.resendSignUp(user.getUsername());
      sb.trigger(`Email resent to ${response.CodeDeliveryDetails.Destination}`, 'info');
    } catch (e: any) {
      sb.trigger(e.message || 'There was an error sending your email address');
    }
  };

  const resendConfirmationCode = async () => {
    try {
      setLoading(true);

      if (!user) throw Error('Unable to get logged in user session');

      user.resendConfirmationCode((err, response) => {
        if (err) throw Error(err.message);
        sb.trigger(`Code resent to ${response.CodeDeliveryDetails.Destination}`, 'info');
      });
    } catch (e: any) {
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
    } catch (e: any) {
      sb.trigger(e.message);
    }
  };

  const triggerForgotPasswordSubmit = async (email: string, code: string, password: string) => {
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      history.push('/auth/login');
      sb.trigger('Password successfully reset', 'info');
    } catch (e: any) {
      sb.trigger(e.message || 'There was an issue');
    }
  };

  const isLoggedIn = async () => {
    try {
      return await Auth.currentSession();
    } catch (e: any) {
      if (!(e === 'No current user')) {
        sb.trigger(e.message || 'There was an issue hi');
      }
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      history.push('/auth/login');
    } catch (e: any) {
      sb.trigger(e.message || 'There was an issue signing you out');
    }
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
    handleLogout,
    resendSignUpEmail,
  };
};

export default useAuth;
