import { useParams } from 'react-router';
import { Loader } from '../Loader/Loader';
import { useGetCharacterByIdQuery } from '../../services/charactersApi';

export const InfoPanel = () => {
  const { id } = useParams();
  if (id === undefined) {
    throw Error('There is no valid id in query string');
  }
  const {
    data: character,
    error,
    isLoading,
    isFetching,
  } = useGetCharacterByIdQuery(id);
  if (error) {
    console.error(error);
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

  if (isLoading || isFetching) return <Loader />;

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
