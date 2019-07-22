import React from 'react';
import { Link } from 'react-router-dom';

// import Button from './Button';


const ActivePickup = ({details}) => {
  const { location, description } = details;

  return (
    <div className="active-pickup">
      <p className="mb-0"><b>Location:</b> {location}</p>
      <p><b>Description:</b> {description}</p>
      <p>
        <Link to="/pickup-details" className="btn-link">View Details</Link>
      </p>
    </div>
  )
};

export default ActivePickup;
