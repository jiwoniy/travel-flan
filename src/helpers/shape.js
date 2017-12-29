import PropTypes from 'prop-types';

export const albumItem = PropTypes.shape({
  userId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  id: PropTypes.number,
  title: PropTypes.string,
});

export const albums = PropTypes.arrayOf(albumItem);
