import albumList from './__fixtures__/albumList.json';

const appStore = (state = {}, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        albums: albumList,
      };
    default:
      return state;
  }
};

export const getAlbums = state => state.albums;

export default appStore;
