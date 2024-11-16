import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth';
import carsReducer from './slices/cars';
// import authReducer from './slices/auth';

const rootPersistConfig = {
  key: 'root',
  storage : storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  auth : authReducer,
  cars : carsReducer
});

export { rootPersistConfig,rootReducer};