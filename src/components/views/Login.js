import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

// import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };

  render() {
    console.log("Props:", this.props);
    console.log("hi");
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
          </FormGroup>
          <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
