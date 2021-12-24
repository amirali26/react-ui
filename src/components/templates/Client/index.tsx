import { Breadcrumbs, Divider, Link } from 'helpmycase-storybook/dist/components/External';
import React from 'react';
import Title from '../../molecules/Title';

type ISummaryProps = {
  breadcrumbs: JSX.Element[],
  title: string,
  subtitle: string,
  rightElement?: JSX.Element,
}

export const Summary: React.FC<ISummaryProps> = ({
  breadcrumbs, title, subtitle, rightElement,
}) => (
  <div style={{ backgroundColor: '#F7F7F7' }}>
    <div
      className="paddingTop paddingBottom"
      style={{
        paddingLeft: '24px', paddingRight: '24px',
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Client
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
    <Divider className="marginTopMedium marginBottomMedium" />
  </div>
);

export default {
  Summary,
};
