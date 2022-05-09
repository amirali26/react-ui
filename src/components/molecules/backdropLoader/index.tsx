import {
  Backdrop, CircularProgress, SxProps, Theme,
} from 'helpmycase-storybook/dist/components/External';
import theme from 'helpmycase-storybook/dist/theme/theme';
import React from 'react';

interface IProps {
  open: boolean;
  sx?: SxProps<Theme> | undefined;
}

const BackdropLoader: React.FC<IProps> = ({ open, sx }: IProps) => (
  <Backdrop
    sx={{
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      ...sx,
    }}
    open={open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default BackdropLoader;
