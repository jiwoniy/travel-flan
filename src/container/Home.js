import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppStoreSelectors } from '../redux/reducers';
import { CommonActions } from '../redux/actions';
import { albums as albumsShape } from '../helpers/shape';

class Home extends Component {
  componentDidMount() {
    const { appInit } = this.props;
    appInit();
  }

  // componentWillReceiveProps(nextProps) {
  //   const { albums } = nextProps;
  // }

  render() {
    const { albums } = this.props;
    const listItems = albums.map(album => (
      <div key={album.id}>
        {album.title}
      </div>
    ));

    return (
      <div>
        {listItems}
      </div>
    );
  }
}

Home.propTypes = {
  albums: albumsShape,
  appInit: PropTypes.func,
};

Home.defaultProps = {
  albums: [],
  appInit: () => {},
};

const mapStateToProps = state => ({
  albums: AppStoreSelectors.getAlbums(state),
});

const mapDispatchToProps = dispatch => ({
  appInit: () => dispatch(CommonActions.appInit()),
});

const connectApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default connectApp;
