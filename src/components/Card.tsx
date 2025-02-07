import { Character } from '../shared/types';

interface CardProps {
  character: Character;
}

export const Card = ({ character }: CardProps) => {
  const { name, gender } = character;

  return (
    <div className="border border-black p-4 rounded shadow-md bg-white text-black">
      <div>Name: {name}</div>
      <div>Gender: {gender}</div>
    </div>
  );
};
