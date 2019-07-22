import React, { Component } from 'react';
import { reduxForm, Field, FormSection, getFormValues, change } from 'redux-form';
import { connect } from 'react-redux';

import { Button, Icon } from '../common';

const PickupFormSection = ({ sectionTitle, sectionName, children, fields = [{name: '', type: "text", label: '', placeholder: ''}] }) => (
  <div className="form-section text-left">
    <div className="section-title">{sectionTitle}:</div>
    <FormSection name={sectionName}>
      {children}
    </FormSection>
  </div>
)

const InputSelectField = ({ className, name, label, options, placeholder }) => (
  <div className={`input-field ${className}`}>
    {label && <label htmlFor={name}>{label}:</label>}
    <Field name={name} component="select">
      {placeholder && <option value="null" default hidden>{placeholder}</option>}
      {options.map(option => <option value={option.value}>{option.text}</option>)}
    </Field>
  </div>
)

const InputTextAreaField = ({className, name, rows, label, placeholder}) => (
  <div className={`input-field ${className}`}>
    {label && <label htmlFor={name}>{label}:</label>}
    <Field name={name} rows={rows} component="textarea" placeholder={placeholder || label} />
  </div>
)

const InputTextField = ({className, name, label, placeholder}) => (
  <div className={`input-field ${className}`}>
    {label && <label htmlFor={name}>{label}:</label>}
    <Field type="text" name={name} component="input" placeholder={placeholder || label} />
  </div>
)

const Volunteer = ({volunteer, onChange}) => (
  <div className="volunteer d-flex align-items-center">
    <div className="volunteer-avatar mr-4">{volunteer.avatar ? <img src={volunteer.avatar} alt={`${volunteer.firstName} ${volunteer.lastName}`} /> : <Icon icon="user" />}</div>
      <div className="form-check form-checkbox flex-grow-1 d-flex justify-content-between">
        <div>{volunteer.firstName} {volunteer.lastName}</div>
        <div className="ml-auto">
          <input className="form-check-input form-field-checkbox-input"
            id={`volunteer-${volunteer.id}`}
            type="checkbox"
            checked={volunteer.selected || false}
            value={volunteer.selected}
            onChange={onChange}
          />
          <label className="form-check-label form-field-checkbox-label" htmlFor={`volunteer-${volunteer.id}`}></label>
        </div>
      </div>
      {/* <Field className="ml-auto" type="checkbox" component="input" name={volunteer.id} id={`volunteer-${volunteer.id}`} /> */}
  </div>
)

class PickupRequest extends Component {
  state = {
    addDescription: false,
  }
  render() {
    const { handleSubmit, updateSelectedVolunteers, formValues } = this.props;
    const { volunteers = [] } = formValues;
    return(
      <div className="container new-pickup-request text-center">
        <h1 className="h5 font-weight-bold">New Pickup Request</h1>
          <form onSubmit={handleSubmit}>
            <PickupFormSection
              sectionName="callerDetails"
              sectionTitle="Caller Details"
            >
              <div className="d-flex flex-wrap">
                <InputTextField name="firstName" label="First Name" className="w-50 pr-4" />
                <InputTextField name="lastName" label="Last Name" className="w-50" />
                <InputTextField name="phone" label="Phone" className="w-50 pr-4" />
                <InputTextField name="phone2" label="Alt Phone" className="w-50" />
              </div>
            </PickupFormSection>
            <PickupFormSection
              sectionName="pickupDetails"
              sectionTitle="Pickup Details"
            >
              <InputTextField name="address1" label="Location" placeholder="Address Line 1" />
              <InputTextField name="address2" placeholder="Address Line 2" />
              <InputSelectField name="pickup-type" label="Pickup Type" placeholder="Select Pickup Type..."
                options={[
                  {value: 'injured', text: 'Injured Animal'},
                  {value: 'abandoned', text: 'Abandoned Animal'},
                ]}
              />
              <Button buttonClass="link" onClick={() => this.setState({addDescription: true})}>Add pickup description</Button>
              {this.state.addDescription &&
                <InputTextAreaField rows={5} name="pickup-description" label="Pickup Description" placeholder="Add some details about your pickup request..." />
              }
              <InputSelectField name="dropoff-location" label="Dropoff Location" placeholder="Select Dropoff Location..."
                options={[]}
              />
            </PickupFormSection>
          <PickupFormSection
            sectionName="volunteers"
            sectionTitle="Available Volunteers"
          >
            {volunteers.map(volunteer => <Volunteer volunteer={volunteer} onChange={(e) => {
              const selectedVolunteers = formValues && formValues.volunteers.map(vol => {
                if(vol.id === volunteer.id) {
                  return {...volunteer, id: volunteer.id, selected: e.target.checked};
                }
                return vol;
              })
              console.log('selectedVolunteers', selectedVolunteers);
              updateSelectedVolunteers(selectedVolunteers);
            }}/>)}
          </PickupFormSection>
          </form>
      </div>
    )
  }
}

PickupRequest = reduxForm({
  form: 'pickupRequest'
})(PickupRequest);

const mapStateToProps = (state) => {
  const formValues = getFormValues('pickupRequest')(state) || {};
  const initialValues = {
    volunteers: state.pickupRequest && state.pickupRequest.volunteers,
  }
  return {
    volunteers: state.pickupRequest && state.pickupRequest.volunteers,
    formValues,
    initialValues
  }
}

export default connect(mapStateToProps, {updateSelectedVolunteers: (volunteers) => change('pickupRequest', 'volunteers', volunteers)})(PickupRequest);
