import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
// import { createStore } from "redux";
import * as history from "history";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import rootReducer from "./store";
import config from "./config";

import "./assets/fonts/icomoon/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Wildlife.css";

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const history = history.createBrowserHistory();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  // Storage: {
  //   region: config.s3.REGION,
  //   bucket: config.s3.BUCKET,
  //   identityPoolId: config.cognito.IDENTITY_POOL_ID,
  // },
  API: {
    endpoints: [
      {
        name: "wildlife-admin",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(<App history={history.createBrowserHistory()} /*store={store}*/ />, document.getElementById("root"));
registerServiceWorker();
