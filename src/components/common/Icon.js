import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  style: PropTypes.object,
};

const Icon = ({icon, className, style}) => {
  return <i className={`icon icon-${icon} ${className}`} style={style} />;
};

Icon.propTypes = propTypes;

export default Icon;
