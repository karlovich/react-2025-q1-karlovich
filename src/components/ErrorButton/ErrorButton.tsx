interface ErrorButtonProps {
  onRaiseError: (raiseError: true) => void;
}

export const ErrorButton = ({ onRaiseError }: ErrorButtonProps) => {
  const onButtonClick = () => {
    onRaiseError(true);
  };

  return (
    <button
      onClick={onButtonClick}
      className="bg-red-500 text-white p-2 rounded cursor-pointer mt-4"
      data-testid="test-error-button"
    >
      Test Error
    </button>
  );
};
