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
  const deleteArr = [1, 2, 3];

  const action = AlbumsActions.deleteAlbums(deleteArr);
  const newState = Object.assign({}, state);

  for (let i = 0; i < deleteArr.length; i += 1) {
    delete newState[deleteArr[i]];
  }

  expect(AlbumsReducer(state, action))
    .toEqual(newState);
});

test('album update', () => {
  const state = albumNormalize(albumList);
  const updateArr = [
    { id: 1, title: 'test1' },
    { id: 2, title: 'test2' },
    { id: 3, title: 'test3' },
  ];

  const action = AlbumsActions.updateAlbums(updateArr);
  const newState = Object.assign({}, state);

  for (let i = 0; i < updateArr.length; i += 1) {
    const updateItem = updateArr[i];
    const findItem = state[updateItem.id];

    newState[updateArr[i].id] = {
      ...findItem,
      title: updateItem.title ? updateItem.title : findItem.title,
      userId: updateItem.userId ? updateItem.userId : findItem.userId,
    };
  }

  expect(AlbumsReducer(state, action))
    .toEqual(newState);
});
