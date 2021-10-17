import { Backdrop, Fade, Modal as MuiModal } from 'helpmycase-storybook/dist/components/External';
import theme from 'helpmycase-storybook/dist/theme/theme';
import React from 'react';

interface IProps {
    open: boolean,
    children: JSX.Element | JSX.Element[]
    handleClose: () => void,
}
const Modal: React.FC<IProps> = ({ open, children, handleClose }: IProps) => (
  <MuiModal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <div style={{
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 4, 4, 4),
      }}
      >
        { children }
      </div>
    </Fade>
  </MuiModal>
);

export default Modal;
