import makeActionCreator from '../../helpers/makeActionCreater';

export const actionTypes = {
  INIT: '@auth/INIT',
  SUCCESS: '@auth/SUCCESS',
  FAILURE: '@auth/FAILURE',
};

export const authInit = makeActionCreator(actionTypes.INIT);
export const authSuccess =
  makeActionCreator(actionTypes.SUCCESS);
export const authFailure =
  makeActionCreator(actionTypes.FAILURE);
// export const deleteAlbums = makeActionCreator(actionTypes.DELETE, 'albums');

