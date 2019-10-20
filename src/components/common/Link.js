import React from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Button that looks like a link, with an 'onClick' property
 */
export const LinkButton = ({ className = "", onClick, type = "button", children }) => (
  <button type={type} className={`link link-btn ${className}`} onClick={onClick}>
    {children}
  </button>
);

const Link = ({ type, className, to, children, ...rest }) => (
  <RouterLink className={className} to={to} {...rest}>
    {children}
  </RouterLink>
);

export default Link;
