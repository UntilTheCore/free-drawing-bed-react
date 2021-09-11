import React, { Fragment } from "react";
import logoUrl from "assets/image/logo.svg";

const Logo: React.FC = () => {
  return (
    <Fragment>
      <img src={logoUrl} alt="logo" style={{width: '45px',height: '45px'}} />
    </Fragment>
  );
};

export default Logo;
