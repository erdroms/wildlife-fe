const initialState = {
  data: [
    { id: 123, firstName: "Jane", lastName: "Doe" },
    { id: 124, firstName: "John", lastName: "Smith" },
    { id: 125, firstName: "Joe", lastName: "User" },
    { id: 126, firstName: "Erin", lastName: "Droms" },
  ],
  loading: false,
  error: "",
};

const volunteers = (state = initialState, action) => {
  return state;
};

export default volunteers;
