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
      console.log(userResponse);
      if (userResponse) setUser(user);
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
          phone_number: phoneNumber,
        },
      });

      if (response.user) setUser(response.user);
    } catch (e) {
      sb.trigger(e.message || 'Something went wrong signing you up');
    } finally {
      setLoading(false);
    }
  };

  const confirmSignUp = async (code: string) => {
    try {
      setLoading(true);

      if (!user) throw Error('Unable to get logged in user session');

      await user?.confirmRegistration(code, false, () => {
        history.push('/dashboard');
      });
    } catch (e) {
      sb.trigger(e || 'Something went wrong confirming your sign up');
      history.push('/auth/signup');
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
      sb.trigger(e);
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
  };
};

export default useAuth;
