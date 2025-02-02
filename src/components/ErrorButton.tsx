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
      <button
        onClick={this.onButtonClick}
        className="bg-red-500 text-white p-2 rounded cursor-pointer mt-4"
      >
        Test Error
      </button>
    );
  }
}
