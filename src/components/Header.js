import React from "react";
import { Icon } from "./common";

const Header = (props) => (
  <div className="header d-flex justify-content-between align-items-center">
    <div className="menu" id="user-menu">
      <Icon icon="user" />
    </div>
    <div className="logo">Wildlife Center</div>
    <div className="menu" id="app-menu">
      <Icon icon="more-vert" />
    </div>
  </div>
);

export default Header;
