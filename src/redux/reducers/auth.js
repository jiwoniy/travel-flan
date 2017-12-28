import { AuthActions } from '../actions';

const { actionTypes: authActionTypes } = AuthActions;

export default function AuthReducer(state = {}, action) {
  const {
    type,
  } = action;

  switch (type) {
    case authActionTypes.INIT:
      return {
        auth: false,
      };
    case authActionTypes.SUCCESS: {
      return {
        auth: true,
      };
    }
    case authActionTypes.DELETE: {
      return {
        auth: false,
      };
    }
    default:
      return state;
  }
}

export const getAuth = state => state.auth;
