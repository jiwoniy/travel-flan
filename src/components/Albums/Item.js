import React from 'react';
// import PropTypes from 'prop-types';

import { albumItem as albumItemShape } from '../../helpers/shape';


function Items(props) {
  const { albumItem } = props;
  const { id, title } = albumItem;

  return (
    <div
      key={id}
      className="AlbumItem"
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

Items.propTypes = {
  albumItem: albumItemShape,
};

Items.defaultProps = {
  albumItem: {},
};

export default Items;
