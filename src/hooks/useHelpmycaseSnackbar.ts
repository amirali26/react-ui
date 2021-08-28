import { useSnackbar } from 'notistack';

interface IProps {
    message: string,
    variant?: 'success' | 'info' | 'error'
}

const useHelpmycaseSnackbar = () => {
  const snackbar = useSnackbar();

  const trigger = ({ variant }: IProps) => snackbar.enqueueSnackbar('', {
    variant: variant || 'error',
  });

  return {
    trigger,
  };
};

export default useHelpmycaseSnackbar;
