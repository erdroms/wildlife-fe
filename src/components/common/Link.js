import React from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Button that looks like a link, with an 'onClick' property
 */
export const LinkButton = ({ className = "", onClick, type, children }) => (
  <button type={type} className={`link link-btn ${className}`} onClick={onClick}>
    {children}
  </button>
);

const Link = ({ text, type, className, onClick, to, ...rest }) => (
  <RouterLink className={className} to={to} {...rest}>
    {text}
  </RouterLink>
);

export default Link;
