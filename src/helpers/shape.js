import PropTypes from 'prop-types';

export const albumItem = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
});

export const albums = PropTypes.arrayOf(albumItem);
