import { Breadcrumbs } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title';

type ISummaryProps = {
  breadcrumbs: JSX.Element[],
  title: string,
  subtitle: string,
  rightElement?: JSX.Element,
}

const TopBar: React.FC<ISummaryProps> = ({
  breadcrumbs, title, subtitle, rightElement,
}) => (
  <div style={{
    height: '26vh', backgroundColor: 'rgb(247,247,247)', padding: '94px 24px 24px 24px', boxSizing: 'border-box',
  }}
  >
    <Breadcrumbs aria-label="breadcrumb">
      <Link key="/dashboard" color="inherit" to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
        Home
      </Link>
      {breadcrumbs}
    </Breadcrumbs>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 0',
      width: '100%',
    }}
    >
      <div>
        <Title
          title={title}
          subtitle={subtitle}
          hideDivider
        />
      </div>
      <div>
        {rightElement}
      </div>
    </div>
  </div>
);

export default TopBar;
