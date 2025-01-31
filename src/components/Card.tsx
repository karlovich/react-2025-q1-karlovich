import { Component } from 'react';
import { Character } from '../shared/types';

interface CardProps {
  character: Character;
}

export class Card extends Component<CardProps> {
  render() {
    return (
      <div>
        <h3>Star Wars Character</h3>
        <div>Name: {this.props.character.name}</div>
        <div>Gender: {this.props.character.name}</div>
      </div>
    );
  }
}
