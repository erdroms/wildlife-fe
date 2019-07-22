import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Dashboard from './components/views/Dashboard';
import PickupRequest from './components/views/PickupRequest';

class App extends Component {
  render() {
    const { history, store } = this.props;
    return (
      <Provider store={store} history={history}>
        <Router history={history}>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pickup-request" component={PickupRequest} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
