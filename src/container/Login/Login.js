import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  HelloWorld,
} from '../../components';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.onStatusChange = this.onStatusChange.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const { fb } = this.props;
    fb.Event.subscribe(
      'auth.logout',
      this.onLogout,
    );
    fb.Event.subscribe(
      'auth.statusChange',
      this.onStatusChange,
    );
  }

  onStatusChange(response) {
    const { fb, successLogin } = this.props;
    if (response.status === 'connected') {
      fb.api('/me', (res) => {
        successLogin(res);
      });
    }
  }

  onLogout() {
    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <div
        className="Login"
      >
        <HelloWorld />
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="xlarge"
          data-show-faces="false"
          data-auto-logout-link="true"
        />
        <div>{this.state.message}</div>
      </div>
    );
  }
}

Login.propTypes = {
  fb: PropTypes.object.isRequired,
  successLogin: PropTypes.func.isRequired,
};

export default Login;

