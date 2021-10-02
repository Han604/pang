import { combineReducers } from 'redux';

import users from './user.reducer';
import desktopToggle from './desktopToggle.reducer';
import sidebar from './sidebar.reducer';

export default combineReducers({ sidebar, users, desktopToggle })