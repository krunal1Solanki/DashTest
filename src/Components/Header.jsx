import React from 'react';

const DashHeader = () => {
  return (
    <header style={headerStyle}>
      <h1>Developer's Review Board</h1>
    </header>
  );
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem',
};

export default DashHeader;
