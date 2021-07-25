import { combineReducers } from 'redux';
import { appData } from './app-data/app-data.js';
import { appChange } from './app-change/app-change.js';
import { user } from './user/user.js';

export const NameSpace = {
  DATA: 'DATA',
  CHANGE: 'CHANGE',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.CHANGE]: appChange,
  [NameSpace.USER]: user,
});
