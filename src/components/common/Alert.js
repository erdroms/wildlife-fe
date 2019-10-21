import React from "react";

const Alert = ({ level = "warning", children }) => {
  return <div className={`alert-${level}`}>{children}</div>;
};

export default Alert;
