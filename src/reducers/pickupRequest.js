const initialState = {
  callerDetails: {
    firstName: '',
    lastName: '',
    phone: '',
    phone2: ''
  },
  volunteers: [
    {id: 123, firstName: 'Jane', lastName: 'Doe', selected: false },
    {id: 124, firstName: 'John', lastName: 'Smith', selected: false },
    {id: 125, firstName: 'Joe', lastName: 'User', selected: false },
    {id: 126, firstName: 'Erin', lastName: 'Droms', selected: false },
  ]
};

const pickupRequest = (state = initialState, action) => {
  return state;
}

export default pickupRequest;
