import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Character } from '@/shared/types';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '../Loader/Loader';

interface Props {
  character?: Character;
}

export const InfoPanel = ({ character }: Props) => {
  const { theme } = useTheme();
  const characterDetails = [
    { label: 'Galaxy URL', value: character?.url },
    { label: 'Name', value: character?.name },
    { label: 'Gender', value: character?.gender },
    { label: 'Birth Year', value: character?.birth_year },
    { label: 'Height', value: character?.height },
    { label: 'Weight', value: character?.mass },
    { label: 'Hair Color', value: character?.hair_color },
    { label: 'Skin Color', value: character?.skin_color },
    { label: 'Eye Color', value: character?.eye_color },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading] = useState(false);

  if (loading) return <Loader />;

  const handleClose = () => {
    router.push(`/` + '?' + searchParams.toString());
  };

  return character ? (
    <div className="relative p-4">
      <button
        onClick={handleClose}
        data-testid="infopanel-close-btn"
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
  ) : null;
};
