// import merge from 'lodash/merge';
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
      if (hasEmpty(payload.albums) && Array.isArray(payload.albums)) {
        return state;
      }

      const { albums } = payload;
      const newState = Object.assign({}, state);

      for (let i = 0; i < albums.length; i += 1) {
        delete newState[albums[i]];
      }

      return newState;
    }
    case albumsActionTypes.UPDATE: {
      if (hasEmpty(payload.albums) && Array.isArray(payload.albums)) {
        return state;
      }

      const { albums } = payload;
      const newState = Object.assign({}, state);

      for (let i = 0; i < albums.length; i += 1) {
        const updateItem = albums[i];
        const findItem = state[albums[i].id];

        newState[albums[i].id] = {
          ...findItem,
          title: updateItem.title ? updateItem.title : findItem.title,
          userId: updateItem.userId ? updateItem.userId : findItem.userId,
        };
      }

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
