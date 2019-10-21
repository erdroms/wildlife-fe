import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

import { ButtonLink, Loader } from "../common";
import PickupRequest from "../PickupRequest";
import ActivePickup from "../ActivePickup";

const Dashboard = (props) => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Get the list of pickup requests, and update it when page changes
    API.get("wildlife-admin", "/pickups")
      .then((res) => {
        setPickupRequests(res);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <ButtonLink to="/pickup-request" className="btn-primary w-100">
            Add new pickup request
          </ButtonLink>
        </div>
      </div>
      <div className="mt-4">
        <h6>Pickup Requests:</h6>
      </div>
      <Loader isLoading={isLoading} message="Loading pickup requests">
        <div className="row">
          <div className="col">
            {pickupRequests.map((request) => (
              <PickupRequest key={request.pickupId} details={request} />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h6>Active Pickups:</h6>
        </div>
        <div className="row">
          <div className="col">
            <ActivePickup details={{ location: "123 N Wild St, Richmond, VA 23015", description: "Injured Owl" }} />
            <ActivePickup details={{ location: "345 Wilderness Ave, Staunton, VA 24401", description: "Baby Deer" }} />
          </div>
        </div>
      </Loader>
    </div>
  );
};

export default Dashboard;
