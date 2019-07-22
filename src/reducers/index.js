import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import pickupRequest from './pickupRequest';

const rootReducer = combineReducers({ form: formReducer, pickupRequest });

export default rootReducer;
