import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { fb } = this.props;
    if (response.status === 'connected') {
      fb.api('/me', (res) => {
        const message = `Welcome  + ${res.name}`;
        this.setState({
          message,
        });
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
      <div className="Login">
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
};

export default Login;

