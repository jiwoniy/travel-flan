import PropTypes from 'prop-types';

export const album = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
});

export const albums = PropTypes.arrayOf(album);
