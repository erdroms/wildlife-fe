import React, { Component } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
// import { Provider } from "react-redux";
import { Auth } from "aws-amplify";

import Login from "./components/views/Login";
import Header from "./components/Header";
import Dashboard from "./components/views/Dashboard";
import PickupRequestForm from "./components/views/PickupRequestForm";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
  };

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  handleLogout = async (event) => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
  };

  render() {
    const { history /*store*/ } = this.props;

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    };

    return (
      !this.state.isAuthenticating && (
        // <Provider store={store} history={history}>
        <Router history={history}>
          <div className="App">
            {!this.state.isAuthenticated ? (
              <div>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </div>
            ) : (
              <Link to="/login" onClick={this.handleLogout}>
                Logout
              </Link>
            )}

            <Header />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" exact render={(props) => <Login {...props} {...childProps} />} />
              <Route exact path="/pickup-request" component={PickupRequestForm} />
            </Switch>
          </div>
        </Router>
        // </Provider>
      )
    );
  }
}

export default App;
