import React from 'react';
// import PropTypes from 'prop-types';

import Item from './Item';
import { albums as albumsShape } from '../../helpers/shape';
import './Albums.css';

function Albums(props) {
  const { albums } = props;
  const listItems = albums.map(album => (
    <Item
      key={album.id}
      albumItem={album}
    />
  ));

  return (
    <div className="Albums">
      {listItems}
    </div>
  );
}

Albums.propTypes = {
  albums: albumsShape,
};

Albums.defaultProps = {
  albums: [],
};

export default Albums;
