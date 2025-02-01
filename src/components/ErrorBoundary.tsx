import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackUI: ReactNode;
  tryAgain: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: object, info: object) {
    console.log('error', error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.tryAgain != this.props.tryAgain && this.props.tryAgain) {
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackUI;
    }

    return this.props.children;
  }
}
