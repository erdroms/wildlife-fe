import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { API } from "aws-amplify";
import { Alert } from "react-bootstrap";

import { Button, Loader, Link, Icon, LinkButton } from "../common";

const DetailRow = ({ label, value }) => (
  <p className="mb-0">
    <b>{label}:</b> <span className="text-capitalize">{value}</span>
  </p>
);

const SelectedVolunteers = ({ volunteers }) => (
  <div className="row no-gutters">
    <div className="mr-2">
      <b>Selected Volunteers:</b>
    </div>
    <div>
      {volunteers &&
        volunteers.map((volunteer) => (
          <p className="mb-1" key={volunteer.id}>
            {volunteer.firstName} {volunteer.lastName}
          </p>
        ))}
    </div>
  </div>
);

const PickupDetails = () => {
  const [pickup, setPickup] = useState({});
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    API.get("wildlife-admin", `/pickups/${id}`)
      .then((res) => {
        setPickup(res);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  const {
    address1,
    address2,
    createdAt,
    dropoffLocation,
    firstName,
    lastName,
    pickupDescription,
    pickupId,
    pickupType,
    userId,
    volunteers,
  } = pickup;

  return (
    <div className="mx-4 my-2">
      <LinkButton onClick={() => history.goBack()}>
        <Icon icon="arrow-left2" />
        <span>&nbsp;Back</span>
      </LinkButton>
      <Loader isLoading={isLoading} message="Loading pickup details">
        <div className="m-4 pickup-details">
          <DetailRow label="Pickup Type" value={pickupType} />
          <DetailRow label="Pickup Location" value={`${address1}, ${address2}`} />
          <DetailRow label="Dropoff Location" value={dropoffLocation} />
          <DetailRow label="Contact" value={`${firstName} ${lastName}`} />
          <DetailRow label="Time Requested" value={moment(createdAt).format("MM/DD/YYYY h:mm:ss A")} />
          <DetailRow label="Description" value={pickupDescription} />
          <SelectedVolunteers volunteers={volunteers} />

          <div className="d-flex align-items-center">
            <Button
              onClick={() => {
                API.del("wildlife-admin", `/pickups/${pickupId}`)
                  .then(() => {
                    history.push("/");
                  })
                  .catch((e) => setError(e.message));
              }}
              buttonClass="primary"
              className="mt-4 w-100"
            >
              Delete Pickup
            </Button>
          </div>
          <div className="mt-4">{error && <Alert variant="danger">{error}</Alert>}</div>
        </div>
      </Loader>
    </div>
  );
};

export default PickupDetails;
