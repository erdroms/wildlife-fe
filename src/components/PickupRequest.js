import React from "react";

import { Button } from "./common";

const PickupRequest = ({ details }) => {
  const {
    address1,
    address2,
    // createdAt,
    // dropoffLocation,
    // firstName,
    // lastName,
    pickupDescription,
    // pickupId,
    pickupType,
    // userId,
    // volunteers,
  } = details;

  return (
    <div className="pickup-request">
      <p className="mb-0">
        <b>Location:</b> {address1}, {address2}
      </p>
      <p className="mb-0">
        <b>Type:</b> <span className="text-capitalize">{pickupType}</span>
      </p>
      <p>
        <b>Description:</b> {pickupDescription}
      </p>
      <div className="d-flex align-items-center">
        <Button buttonClass="primary" className="mr-2 w-100">
          Initiate Pickup
        </Button>
        <Button buttonClass="secondary" className="w-100">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PickupRequest;
