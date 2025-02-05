import { Component } from 'react';
import { Character } from '../shared/types';

interface CardProps {
  character: Character;
}

export class Card extends Component<CardProps> {
  render() {
    const { name, gender } = this.props.character;

    return (
      <div className="border border-black p-4 rounded shadow-md bg-white text-black">
        <div>Name: {name}</div>
        <div>Gender: {gender}</div>
      </div>
    );
  }
}
