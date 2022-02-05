import {
  Button, ButtonProps, Styles, Typography,
} from 'helpmycase-storybook/dist/components/External';
import theme from 'helpmycase-storybook/dist/theme/theme';
import React from 'react';
import clsx from 'clsx';

interface IProps {
  icon: JSX.Element,
  title: string,
  subtitle: string,
  buttonProps?: ButtonProps,
  variant?: 'drawer',
  style?: React.CSSProperties,
}

const useStyles = Styles.makeStyles({
  iconHolder: {
    '& > svg': {
      width: '100%',
      height: '100%',
      color: theme.palette.primary.main,
    },
  },
  drawer: {
    '& h2': {
      fontSize: '24px',
    },
    '& h6': {
      fontSize: '16px',
    },
    '& > div': {
      width: '70px !important',
    },
  },
});

const BigMessage: React.FC<IProps> = ({
  icon, title, subtitle, buttonProps, variant, style,
}: IProps) => {
  const classes = useStyles();
  return (
    <div className={clsx('absolute alignCenter flex column center', variant === 'drawer' && classes.drawer)} style={{ maxWidth: '700px', top: '40%', ...style }}>
      <div style={{ width: '100px', height: '100px' }} className={classes.iconHolder}>
        {icon}
      </div>
      <Typography variant="h2" className="marginBottomSmall textAlignCenter">{title}</Typography>
      <Typography variant="h6" className="marginBottomMedium textAlignCenter">{subtitle}</Typography>
      {
        buttonProps
        && (
          <Button variant="contained" color="primary" {...buttonProps}>
            {buttonProps.children}
          </Button>
        )
      }
    </div>
  );
};

export default BigMessage;
