import { Box, Fade, Modal as MuiModal } from 'helpmycase-storybook/dist/components/External';
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
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
        >
          {children}
        </Box>
      </div>
    </Fade>
  </MuiModal>
);

export default Modal;
