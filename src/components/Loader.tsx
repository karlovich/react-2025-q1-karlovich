import { Component } from 'react';
import fadeCircles from '../assets/fade-stagger-circles.svg';

export class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img src={fadeCircles} className="loader-img" alt="Loading..." />
      </div>
    );
  }
}
