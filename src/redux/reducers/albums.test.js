// import configureMockStore from 'redux-mock-store';

import { AlbumsActions } from '../actions';
// import { albumsInit } from '../actions/albums';

import { AlbumsReducer } from '../reducers';
import getAlbumId from '../../helpers/getAlbumId';
import albumNormalize from '../../helpers/albumNormalizer';
import albumList from './__fixtures__/albumList.json';

// const mockStore = configureMockStore();

test('getAlbumId', () => {
  const albums = albumNormalize(albumList);
  const newId = getAlbumId(albums);
  expect(newId).toEqual(101);
});

test('album init', () => {
  const action = AlbumsActions.albumsInit();
  expect(AlbumsReducer({}, action)).toEqual(albumNormalize(albumList));
});

test('album create', () => {
  const state = albumNormalize(albumList);
  const create1 = { userId: 1, titile: 'test1' };
  const create2 = { userId: 2, titile: 'test2' };

  const result1 = {
    ...albumNormalize(albumList),
    [getAlbumId(state)]: { ...create1 },
  };
  const result2 = {
    ...result1,
    [getAlbumId(result1)]: { ...create2 },
  };

  const action1 = AlbumsActions.createAlbum(create1);
  const action2 = AlbumsActions.createAlbum(create2);

  expect(AlbumsReducer(albumNormalize(albumList), action1))
    .toEqual(result1);
  expect(AlbumsReducer(result1, action2))
    .toEqual(result2);
});

test('album delete', () => {
  const state = albumNormalize(albumList);
  const deleteAlbum = { id: 1 };

  const action = AlbumsActions.deleteAlbums(deleteAlbum);
  const newState = Object.assign({}, state);

  delete newState[deleteAlbum.id];

  expect(AlbumsReducer(state, action))
    .toEqual(newState);
});

test('album update', () => {
  const state = albumNormalize(albumList);
  const updateAlbum = { id: 1, title: 'test1' };

  const action = AlbumsActions.updateAlbums(updateAlbum);
  const newState = Object.assign({}, state);

  const findItem = state[updateAlbum.id];

  newState[findItem.id] = {
    ...findItem,
    title: updateAlbum.title ? updateAlbum.title : findItem.title,
  };

  expect(AlbumsReducer(state, action))
    .toEqual(newState);
});
