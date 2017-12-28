import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Albums,
  Pagination,
} from '../components';
import { AppStoreSelectors } from '../redux/reducers';
import { CommonActions } from '../redux/actions';
import { albums as albumsShape } from '../helpers/shape';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageOfItems: [],
    };

    this.onChangePage = this.onChangePage.bind(this);
  }
  componentDidMount() {
    const { appInit } = this.props;
    appInit();
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems });
  }

  // componentWillReceiveProps(nextProps) {
  //   const { albums } = nextProps;
  // }

  render() {
    const { albums } = this.props;
    const { pageOfItems } = this.state;
    return (
      <div>
        <Albums albums={pageOfItems} />
        <Pagination
          items={albums}
          onChangePage={this.onChangePage}
        />
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
