import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

import {
  Loader,
} from '../../components';
import Login from '../Login';
import Home from '../Home';

class Init extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fbLoginStatus: false,
      fb: window.FB,
    };

    this.getFBLoginStatus = this.getFBLoginStatus.bind(this);
  }

  componentDidMount() {
    this.getFBLoginStatus();
  }

  getFBLoginStatus() {
    if (window.FB) {
      window.FB.getLoginStatus((response) => {
        const { status } = response;
        this.setState({
          fb: window.FB,
          fbLoginStatus: status === 'connected',
        });
        // statusChangeCallback(response);
      });
    } else {
      setTimeout(this.getFBLoginStatus, 1000);
    }
  }

  render() {
    // const { fb, fbLoginStatus } = this.state;
    // if (fbLoginStatus) {
      return (
        <Home />
      );
    // } else if (fb && typeof fb === 'object' && fbLoginStatus === false) {
    //   return <Login fb={fb} />;
    // }

    // return <Loader />;
  }
}

Init.propTypes = {
  // albums: albumsShape,
  // appInit: PropTypes.func,
};

Init.defaultProps = {
  // albums: [],
  // appInit: () => {},
};

// const mapStateToProps = state => ({
//   albums: AppStoreSelectors.getAlbums(state),
// });

// const mapDispatchToProps = dispatch => ({
//   appInit: () => dispatch(CommonActions.appInit()),
// });

// const connectInit = connect(
//   null,
//   null,
// )(Init);

export default Init;
