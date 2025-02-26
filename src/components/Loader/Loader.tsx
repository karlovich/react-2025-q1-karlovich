import './Loader.css';
import fadeCircles from '../../assets/fade-stagger-circles.svg';

export const Loader = () => {
  return (
    <div className="loader">
      <img
        src={fadeCircles}
        className="loader-img"
        alt="Loading..."
        data-testid="test-loader-img"
      />
    </div>
  );
};
