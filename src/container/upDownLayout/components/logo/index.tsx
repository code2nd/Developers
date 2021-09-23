import { memo } from 'react';
import logo from 'assests/logo.png';
import './index.scss';

const Logo = () => {
  return (
    <a className="logo" href="/">
      <img className="logo-img" src={logo} alt="logo" />
      Developers
    </a>
  );
};

export default memo(Logo);
