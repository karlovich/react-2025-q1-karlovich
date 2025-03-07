import './Loader.css';
import fadeCircles from '@/assets/fade-stagger-circles.svg';
import Image from 'next/image';

export const Loader = () => {
  return (
    <div className="loader">
      <Image
        className="loader-img"
        src={fadeCircles}
        alt="Loading..."
        data-testid="test-loader-img"
      />
    </div>
  );
};
