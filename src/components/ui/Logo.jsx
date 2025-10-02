import React from 'react';

const Logo = React.memo(() => {
  return (
    <div className="logo-container">
      <span
      className='logo'
      >Memory Game</span>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;