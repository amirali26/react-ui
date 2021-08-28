import Auth from '@aws-amplify/auth/lib';
import { useAuthContext } from '../../context/AuthContext';
import useHelpmycaseSnackbar from '../../hooks/useHelpmycaseSnackbar';
import history from '../../utils/routes/history';

const useAuth = () => {
  const sb = useHelpmycaseSnackbar();
  const { user, setUser } = useAuthContext();

  const signIn = async (username: string, password: string) => {
    try {
      const userResponse = await Auth.signIn(username, password);

      if (userResponse) setUser(user);
    } catch (e) {
      sb.trigger(e.message || e.response?.data?.error || 'Something went wrong with signing you in');
    }
  };

  const signUp = async (username: string,
    password: string,
    email: string,
    phoneNumber: string): Promise<void> => {
    try {
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
      sb.trigger(e.message || e.response?.data?.error || 'Something went wrong signing you up');
    }
  };

  const confirmSignUp = async (code: string) => {
    try {
      if (!user) throw Error('Unable to get logged in user session');

      await user?.confirmRegistration(code, false, () => {
        history.push('/dashboard');
      });
    } catch (e) {
      sb.trigger(e.message || e.response?.data?.error || 'Something went wrong confirming your sign up');
      history.push('/auth/signup');
    }
  };

  const resendConfirmationCode = async () => {
    try {
      if (!user) throw Error('Unable to get logged in user session');

      await user?.resendConfirmationCode((err, _) => {
        if (err) throw Error(err.message);
      });
    } catch (e) {
      sb.trigger(e.message);
      history.push('/auth/login');
    }
  };

  return {
    signIn,
    signUp,
    confirmSignUp,
    resendConfirmationCode,
  };
};

export default useAuth;
