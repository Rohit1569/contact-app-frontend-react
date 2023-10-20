import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
    };

    componentDidCatch(error, info) {
        // Update state to indicate an error has occurred.
        this.setState({ hasError: true, error });
        // You can also log the error to a logging service here.
    }

    render() {
        if (this.state.hasError) {
            // Render a fallback UI when an error occurs.
            return <div>Error: {this.state.error.message}</div>;
        }
        // Render the child components as usual.
        return this.props.children;
    }
}

export default ErrorBoundary;
