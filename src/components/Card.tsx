import { Character } from '../shared/types';
import { useNavigate } from 'react-router';

interface CardProps {
  character: Character;
}

export const Card = ({ character }: CardProps) => {
  const navigate = useNavigate();
  const { name, gender, url } = character;

  const onClick = (url: string) => {
    const id = (url && url.split('/')[5]) || '';
    if (id) {
      navigate(`/characters/${id}`);
    }
  };

  return (
    <div
      onClick={() => {
        onClick(url);
      }}
      className="border border-black p-4 rounded shadow-md bg-white text-black"
    >
      <div>Name: {name}</div>
      <div>Gender: {gender}</div>
    </div>
  );
};
