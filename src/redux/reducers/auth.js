import { AuthActions } from '../actions';

const { actionTypes: authActionTypes } = AuthActions;

export default function AuthReducer(state = {}, action) {
  const {
    type,
    payload,
  } = action;

  switch (type) {
    case authActionTypes.INIT:
      return {
        login: false,
        userId: null,
      };
    case authActionTypes.SUCCESS: {
      return {
        login: true,
        userId: payload.id,
      };
    }
    case authActionTypes.FAILURE: {
      return {
        login: false,
        userId: null,
      };
    }
    default:
      return state;
  }
}

export const getAuth = state => state.auth;
export const isLogin = state => state.auth.login;
export const getUserId = state => state.auth.userId;
