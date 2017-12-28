import makeActionCreator from '../../helpers/makeActionCreater';

export const actionTypes = {
  INIT: '@albums/INIT',
  CREATE: '@albums/CREATE',
  UPDATE: '@albums/UPDATE',
  DELETE: '@albums/DELETE',
};

export const albumsInit = makeActionCreator(actionTypes.INIT);
export const createAlbum =
  makeActionCreator(actionTypes.CREATE, 'album');
export const updateAlbums =
  makeActionCreator(actionTypes.UPDATE, 'albums');
export const deleteAlbums = makeActionCreator(actionTypes.DELETE, 'albums');
