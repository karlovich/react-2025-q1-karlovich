import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Character } from '../../shared/types';
import { Loader } from '../Loader/Loader';

export const InfoPanel = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();

  const fetchData = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://swapi.dev/api/people/${id.trim()}`);

      const data = await response.json();
      setCharacter(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  const characterDetails = [
    { label: 'Galaxy ID', value: id },
    { label: 'Name', value: character?.name },
    { label: 'Gender', value: character?.gender },
    { label: 'Birth Year', value: character?.birth_year },
    { label: 'Height', value: character?.height },
    { label: 'Weight', value: character?.mass },
    { label: 'Hair Color', value: character?.hair_color },
    { label: 'Skin Color', value: character?.skin_color },
    { label: 'Eye Color', value: character?.eye_color },
  ];

  return (
    <>
      {characterDetails.map((detail) => (
        <div key={detail.label}>
          <span className="font-bold">
            {detail.label}: {detail.value}
          </span>
        </div>
      ))}
    </>
  );
};
