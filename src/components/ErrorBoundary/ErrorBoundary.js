import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  static reload() {
    window.location.href = '/';
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };

    // ErrorBoundary.reload = ErrorBoundary.reload.bind(this);
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service

    // TODO: Error handling
    // logErrorToMyService(error, info);
  }

  render() {
    const { children } = this.props;

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="ErrorBoundary">
          <h1>
            Something went wrong.
          </h1>
          <button
            style={{ width: '100px' }}
            onClick={ErrorBoundary.reload}
          >
            Try to Reload
          </button>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ErrorBoundary;
