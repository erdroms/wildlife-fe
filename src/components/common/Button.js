import React from "react";
import { Link as RouterLink } from "react-router-dom";

/**
 * Link that looks like a button, with a 'to' property
 */
export const ButtonLink = ({ className = "", ...rest }) => (
  <RouterLink className={`btn btn-link ${className}`} {...rest} />
);

const Button = ({ children, type = "button", buttonClass = "", className, onClick, to, ...rest }) => (
  <button type={type} className={`btn btn-${buttonClass} ${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
