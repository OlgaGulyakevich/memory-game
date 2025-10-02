import React from 'react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = React.memo(() => {
  return (
    <div className="screen-navigation">
      <Logo />
      <LanguageSwitcher />
    </div>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
