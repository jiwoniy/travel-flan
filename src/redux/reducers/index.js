import { combineReducers } from 'redux';

import AlbumsReducer, * as AlbumSelectors from './albums';
import AuthReducer, * as AuthSelectors from './auth';

const reducers = {
  albums: AlbumsReducer,
  auth: AuthReducer,
};

const RootReducer = combineReducers({
  ...reducers,
});

export default RootReducer;
export {
  AlbumsReducer,
  AlbumSelectors,
  AuthReducer,
  AuthSelectors,
};

