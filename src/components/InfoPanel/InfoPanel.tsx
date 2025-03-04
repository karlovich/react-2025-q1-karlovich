// import { useParams, useNavigate, useLocation } from 'react-router';
import { Loader } from '../Loader/Loader';
import { useGetCharacterByIdQuery } from '../../services/charactersApi';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

export const InfoPanel = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  // const location = useLocation();
  const { theme } = useTheme();
  const [id] = useState('1');
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

  const handleClose = () => {
    // const searchParams = new URLSearchParams(location.search);
    // navigate(`/?${searchParams.toString()}`);
  };

  return (
    <div className="relative p-4">
      <button
        onClick={handleClose}
        className={`${theme === 'dark-mode' ? 'bg-black text-white' : 'bg-amber-200 text-black'} absolute top-1 right-1 font-bold px-2 cursor-pointer`}
      >
        X
      </button>
      {characterDetails.map((detail) => (
        <div key={detail.label}>
          <span className="font-bold">
            {detail.label}: {detail.value}
          </span>
        </div>
      ))}
    </div>
  );
};
