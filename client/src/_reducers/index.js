import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { sites } from './sites.reducer';
import { alert } from './alert.reducer';
import { containers } from './containers.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  containers,
  sites,
  alert
});

export default rootReducer;
