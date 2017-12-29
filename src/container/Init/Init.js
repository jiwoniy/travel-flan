import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AuthActions } from '../../redux/actions';
import { AuthSelectors } from '../../redux/reducers';
import {
  Loader,
} from '../../components';
import Login from '../Login';
import Home from '../Home';

class Init extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fbReady: false,
      fbLoginStatus: false,
    };

    this.initializeFacebookLogin = this.initializeFacebookLogin.bind(this);
    this.facebookLoginHandler = this.facebookLoginHandler.bind(this);
    this.successLogin = this.successLogin.bind(this);
  }

  componentWillMount() {
    const { authInit } = this.props;
    authInit();
  }

  componentDidMount() {
    document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
  }

  initializeFacebookLogin() {
    this.FB = window.FB;
    this.setState({
      fbReady: true,
    });
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.FB.getLoginStatus(this.facebookLoginHandler);
  }

  facebookLoginHandler(response) {
    if (response.status === 'connected') {
      this.FB.api('/me', (res) => {
        this.successLogin(res);
      });
    }
  }

  successLogin(res) {
    const { authSuccess } = this.props;
    authSuccess(res.id);
    this.setState({
      fbLoginStatus: true,
    });
  }

  render() {
    const { isLogin } = this.props;
    const { fbReady, fbLoginStatus } = this.state;

    if (isLogin) {
      return (
        <Home />
      );
    } else if (fbLoginStatus === false && fbReady === true) {
      return (
        <Login
          fb={this.FB}
          successLogin={this.successLogin}
        />
      );
    }

    return <Loader />;
  }
}

Init.propTypes = {
  authInit: PropTypes.func.isRequired,
  authSuccess: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
};

Init.defaultProps = {
  isLogin: false,
};

const mapStateToProps = state => ({
  auth: AuthSelectors.getAuth(state),
  isLogin: AuthSelectors.isLogin(state),
});

const mapDispatchToProps = dispatch => ({
  authInit: () => dispatch(AuthActions.authInit()),
  authSuccess: id => dispatch(AuthActions.authSuccess(id)),
});

const connectInit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Init);

export default connectInit;
