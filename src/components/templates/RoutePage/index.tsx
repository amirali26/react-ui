import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const RoutePage: React.FC<Props> = ({ children }) => (
  <div
    style={{
      position: 'relative', minHeight: '74vh', boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

export default RoutePage;
