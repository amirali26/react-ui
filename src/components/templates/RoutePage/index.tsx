import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const RoutePage: React.FC<Props> = ({ children }) => (
  <div
    style={{
      margin: '12px 24px', position: 'relative', minHeight: 'calc(100vh - 289px)',
    }}
  >
    {children}
  </div>
);

export default RoutePage;
