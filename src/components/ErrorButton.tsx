import { Component } from 'react';
interface ErrorButtonProps {
  onRaiseError: (raiseError: true) => void;
}

export class ErrorButton extends Component<ErrorButtonProps> {
  onButtonClick = () => {
    this.props.onRaiseError(true);
  };

  render() {
    return (
      <button onClick={this.onButtonClick} className="error-button">
        Test Error
      </button>
    );
  }
}
