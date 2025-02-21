import { useState } from 'react';
import { Character } from '../../shared/types';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../features/cardStoreSlice';
import { RootState } from '../../app/store';

interface CardProps {
  character: Character;
}

export const Card = ({ character }: CardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, gender, url } = character;
  const getId = (url: string) => {
    const id = (url && url.split('/')[5]) || '';
    return id;
  };
  const isChecked = useSelector(
    (state: RootState) => state.cardStore.characters.indexOf(getId(url)) !== -1
  );
  const [checked, setChecked] = useState(isChecked);
  const dispatch = useDispatch();

  const onClick = (url: string) => {
    const id = (url && url.split('/')[5]) || '';
    if (id) {
      navigate(`/characters/${id}` + location.search);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      dispatch(add(id));
    } else {
      dispatch(remove(id));
    }
  };

  return (
    <div
      onClick={() => {
        onClick(url);
      }}
      className="border border-black p-4 rounded shadow-md bg-white text-black"
      data-testid="test-card"
    >
      <div>
        <div className="flex items-center">
          <input
            id={`checked-checkbox-${getId(url)}`}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e, getId(url))}
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={`checked-checkbox-${getId(url)}`}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Store {name}
          </label>
        </div>
      </div>
      <div>Name: {name}</div>
      <div>Gender: {gender}</div>
    </div>
  );
};
