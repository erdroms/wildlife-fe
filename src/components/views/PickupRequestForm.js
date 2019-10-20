import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import { API } from "aws-amplify";

import { Icon, LinkButton } from "../common";

const TEST_VOLUNTEERS = [
  { id: 123, firstName: "Jane", lastName: "Doe" },
  { id: 124, firstName: "John", lastName: "Smith" },
  { id: 125, firstName: "Joe", lastName: "User" },
  { id: 126, firstName: "Erin", lastName: "Droms" },
];

const PickupFormSection = ({ sectionTitle, children }) => (
  <div className="form-section text-left">
    <div className="section-title">{sectionTitle}:</div>
    {children}
  </div>
);

const InputSelectField = ({ className, name, label, options, placeholder }) => (
  <div className={`input-field ${className}`}>
    {label && <label htmlFor={name}>{label}:</label>}
    <Field name={name} component="select">
      {placeholder && (
        <option value="null" default hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.text}
        </option>
      ))}
    </Field>
  </div>
);

const InputTextAreaField = ({ className, name, rows, label, placeholder }) => (
  <div className={`input-field ${className}`}>
    {label && <label htmlFor={name}>{label}:</label>}
    <Field name={name} rows={rows} component="textarea" placeholder={placeholder || label} />
  </div>
);

const InputTextField = ({ className, name, label, placeholder, onChange }) => (
  <div className={`input-field ${className}`}>
    {label && <label htmlFor={name}>{label}:</label>}
    <Field type="text" name={name} component="input" placeholder={placeholder || label} />
  </div>
);

const Volunteer = ({ volunteer, onChange, selected }) => (
  <div className="volunteer d-flex align-items-center">
    <div className="volunteer-avatar mr-4">
      {volunteer.avatar ? (
        <img src={volunteer.avatar} alt={`${volunteer.firstName} ${volunteer.lastName}`} />
      ) : (
        <Icon icon="user" />
      )}
    </div>
    <div className="form-check form-checkbox flex-grow-1 d-flex justify-content-between">
      <div>
        {volunteer.firstName} {volunteer.lastName}
      </div>
      <div className="ml-auto">
        <input
          className="form-check-input form-field-checkbox-input"
          id={`volunteer-${volunteer.id}`}
          type="checkbox"
          checked={selected}
          onChange={onChange}
        />
        <label className="form-check-label form-field-checkbox-label" htmlFor={`volunteer-${volunteer.id}`} />
      </div>
    </div>
  </div>
);

const PickupRequest = () => {
  const [addDescription] = useState(false);
  const [volunteers, setVolunteers] = useState(TEST_VOLUNTEERS);

  // useEffect(() => {
  //   API.get("wildlife-admin", "/pickups").then((res) => setPickupRequests(res));
  // }, []);

  return (
    <div className="container new-pickup-request text-center">
      <h1 className="h5 font-weight-bold">New Pickup Request</h1>
      <Formik
        // initialValues={}
        onSubmit={(values, actions) => {
          return API.post("wildlife-admin", "/pickups", {
            body: {
              content: values,
            },
          })
            .then((res) => {
              console.log(res);
              actions.setSubmitting(false);
            })
            .catch((err) => {
              throw new Error(err);
            });
        }}
        render={(props) => (
          <form onSubmit={props.handleSubmit}>
            <PickupFormSection sectionName="callerDetails" sectionTitle="Caller Details">
              <div className="d-flex flex-wrap">
                <InputTextField name="firstName" label="First Name" className="w-50 pr-4" />
                <InputTextField name="lastName" label="Last Name" className="w-50" />
                <InputTextField name="phone" label="Phone" className="w-50 pr-4" />
                <InputTextField name="phone2" label="Alt Phone" className="w-50" />
              </div>
            </PickupFormSection>
            <PickupFormSection sectionName="pickupDetails" sectionTitle="Pickup Details">
              <InputTextField name="address1" label="Pickup Location" placeholder="Address Line 1" />
              <InputTextField name="address2" placeholder="Address Line 2" />
              <InputSelectField
                name="pickupType"
                label="Pickup Type"
                placeholder="Select Pickup Type..."
                options={[
                  { id: 1, value: "injured", text: "Injured Animal" },
                  { id: 2, value: "abandoned", text: "Abandoned Animal" },
                ]}
              />
              <LinkButton className="ml-2" onClick={() => this.setState({ addDescription: true })}>
                Add pickup description
              </LinkButton>
              {addDescription && (
                <InputTextAreaField
                  rows={5}
                  name="pickupDescription"
                  label="Pickup Description"
                  placeholder="Add some details about your pickup request..."
                />
              )}
              <InputSelectField
                name="dropoffLocation"
                label="Dropoff Location"
                placeholder="Select Dropoff Location..."
                options={[
                  {
                    id: 1,
                    value: "wlc",
                    text: "Wildlife Center of Virginia",
                  },
                  {
                    id: 2,
                    value: "option 2",
                    text: "Option 2",
                  },
                ]}
              />
            </PickupFormSection>
            <PickupFormSection sectionName="volunteers" sectionTitle="Available Volunteers">
              {volunteers.map((volunteer) => {
                let selectedVolunteers = props.values.volunteers || [];
                const volunteerIndex = selectedVolunteers.findIndex(
                  (selectedVolunteer) => selectedVolunteer.id === volunteer.id,
                );

                return (
                  <Volunteer
                    selected={volunteerIndex > -1}
                    volunteer={volunteer}
                    onChange={(e) => {
                      if (volunteerIndex > -1) {
                        selectedVolunteers = selectedVolunteers.filter((selected) => selected.id !== volunteer.id);
                      } else {
                        selectedVolunteers = [...selectedVolunteers, volunteer];
                      }
                      props.setFieldValue("volunteers", selectedVolunteers);
                    }}
                  />
                );
              })}
            </PickupFormSection>
            <button type="submit">Submit</button>
            <div style={{ padding: 10, backgroundColor: "#efefef", margin: "10px 0" }}>
              {JSON.stringify(props.values, null, 2)}
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default PickupRequest;
