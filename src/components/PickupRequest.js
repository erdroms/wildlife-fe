import React from 'react';

import {Button} from './common';


const PickupRequest = ({details}) => {
  const { location, description } = details;

  return (
    <div className="pickup-request">
      <p className="mb-0"><b>Location:</b> {location}</p>
      <p><b>Description:</b> {description}</p>
      <div className="d-flex align-items-center">
        <Button buttonClass="primary" text="Initiate Pickup" className="mr-2 w-100" />
        <Button buttonClass="secondary" text="View Details" className="w-100" />
      </div>
    </div>
  )
};

export default PickupRequest;
