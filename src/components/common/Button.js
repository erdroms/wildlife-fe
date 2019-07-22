import React from 'react';

const Button = ({ children, type = "button", buttonClass, className, onClick, to, ...rest }) => (
  <button type={type} className={`btn btn-${buttonClass} ${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
