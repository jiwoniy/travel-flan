import { AlbumsActions } from '../actions';
import hasEmpty from '../../helpers/hasEmpty';
import getAlbumId from '../../helpers/getAlbumId';
import albumNormalize from '../../helpers/albumNormalizer';
import albumList from './__fixtures__/albumList.json';

const { actionTypes: albumsActionTypes } = AlbumsActions;

export default function AlbumsReducer(state = {}, action) {
  const {
    type,
    payload,
  } = action;

  switch (type) {
    case albumsActionTypes.INIT:
      return albumNormalize(albumList);
    case albumsActionTypes.CREATE: {
      if (hasEmpty(payload.album)) {
        return state;
      }

      return {
        ...state,
        [getAlbumId(state)]: { ...payload.album },
      };
    }
    case albumsActionTypes.DELETE: {
      if (hasEmpty(payload.album) && Array.isArray(payload.album)) {
        return state;
      }

      const { album } = payload;
      const newState = Object.assign({}, state);

      delete newState[album.id];

      return newState;
    }
    case albumsActionTypes.UPDATE: {
      if (hasEmpty(payload.album) && Array.isArray(payload.album)) {
        return state;
      }

      const { album } = payload;
      const newState = Object.assign({}, state);

      const findItem = state[album.id];
      newState[album.id] = {
        ...findItem,
        title: album.title ? album.title : findItem.title,
      };
      return newState;
    }
    default:
      return state;
  }
}

export const getAlbums = (state) => {
  const { albums } = state;
  const idArr = Object.keys(albums);
  const result = [];
  idArr.forEach((id) => {
    const numberId = Number(id);
    result.push({
      id: numberId,
      title: albums[numberId].title,
      userId: albums[numberId].userId,
    });
  });

  return result;
};
