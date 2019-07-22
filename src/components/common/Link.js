import React from 'react';
import { withRouter, Link } from 'react-router-dom';

export const ButtonLink = ({ className, buttonClass, ...rest }) => (
  <WCLink className={`btn btn-link ${buttonClass ? `btn-${buttonClass}` : ''} ${className}`} {...rest} />
)

const WCLink = ({ text, type, className, to, ...rest }) => (
  <Link className={className} to={to}>
    {text}
  </Link>
);

export default WCLink;
