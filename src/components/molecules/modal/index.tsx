import { Fade, Modal as MuiModal } from 'helpmycase-storybook/dist/components/External';
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
  >
    <Fade in={open}>
      <div style={{
        backgroundColor: '#121212',
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(6, 12, 6, 12),
      }}
      >
        {children}
      </div>
    </Fade>
  </MuiModal>
);

export default Modal;
