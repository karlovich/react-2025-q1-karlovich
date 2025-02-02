import { Component } from 'react';
import { Character } from '../shared/types';

interface CardProps {
  character: Character;
}

export class Card extends Component<CardProps> {
  render() {
    return (
      <div className="border border-black p-4 rounded shadow-md bg-white text-black">
        <div>Name: {this.props.character.name}</div>
        <div>Gender: {this.props.character.name}</div>
      </div>
    );
  }
}
