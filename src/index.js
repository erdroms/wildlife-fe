import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import createBrowserHistory from 'history/createBrowserHistory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

import './assets/fonts/icomoon/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Wildlife.css';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const history = createBrowserHistory();

ReactDOM.render(<App history={history} store={store} />, document.getElementById('root'));
registerServiceWorker();
