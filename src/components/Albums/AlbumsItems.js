import React from 'react';
import PropTypes from 'prop-types';

import { albumItem as albumItemShape } from '../../helpers/shape';


function AlbumsItems(props) {
  const { albumItem } = props;
  const { id, title } = albumItem;

  return (
    <div
      role="presentation"
      key={id}
      className="AlbumItem"
      onClick={props.onAlbumsItemsClick}
    >
      <img
        className="AlbumItem__img"
        src="http://via.placeholder.com/200x100"
        alt="imgPlaceholder"
      />
      <p className="AlbumItem__title"> {title} </p>
    </div>
  );
}

AlbumsItems.propTypes = {
  albumItem: albumItemShape,
  onAlbumsItemsClick: PropTypes.func.isRequired,
};

AlbumsItems.defaultProps = {
  albumItem: {},
};

export default AlbumsItems;
