import React from "react";

const Loader = ({ isLoading, message, children }) => {
  if (isLoading) {
    return <div>Loading{message && ` - ${message}`}</div>;
  }
  return children;
};

export default Loader;
