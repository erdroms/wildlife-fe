import React from 'react';

import { Button, ButtonLink } from '../common';
import PickupRequest from '../PickupRequest';
import ActivePickup from '../ActivePickup';

const Dashboard = (props) => (
  <div className="container">
    <div className="row">
      <div className="col text-center">
        <ButtonLink to="/pickup-request" buttonClass="primary" text="Add new pickup request" className="w-100" />
      </div>
    </div>
    <div className="mt-4">
      <h6>Pickup Requests:</h6>
    </div>
    <div className="row">
      <div className="col">
        <PickupRequest details={{location: "123 N Wild St, Richmond, VA 23015", description: "Injured Owl"}} />
        <PickupRequest details={{location: "345 Wilderness Ave, Staunton, VA 24401", description: "Baby Deer"}} />
      </div>
    </div>
    <div className="mt-4">
      <h6>Active Pickups:</h6>
    </div>
    <div className="row">
      <div className="col">
        <ActivePickup details={{location: "123 N Wild St, Richmond, VA 23015", description: "Injured Owl"}} />
        <ActivePickup details={{location: "345 Wilderness Ave, Staunton, VA 24401", description: "Baby Deer"}} />
      </div>
    </div>
  </div>
)

export default Dashboard;
