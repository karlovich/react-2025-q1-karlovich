import { Character } from '../../shared/types';
// import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../features/cardStoreSlice';
import { RootState } from '../../store/store';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/router';

interface CardProps {
  character: Character;
}

export const Card = ({ character }: CardProps) => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const { theme } = useTheme();
  const router = useRouter();
  const { name, gender, url } = character;
  const getId = (url: string) => {
    const id = (url && url.split('/')[5]) || '';
    return id;
  };
  const checked = useSelector(
    (state: RootState) =>
      state.cardStore.characters.find((item) => item.url === character.url) !==
      undefined
  );

  const dispatch = useDispatch();

  const onClick = (url: string) => {
    const id = (url && url.split('/')[5]) || '';
    if (id) {
      if (router.query.id) {
        router.push({
          query: { ...router.query, id },
        });
      } else {
        router.push({
          pathname: `/characters/${id}`,
          query: router.query,
        });
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(add(character));
    } else {
      dispatch(remove(character));
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(url);
      }}
      className={`${theme === 'dark-mode' ? 'bg-white text-black border-black' : 'bg-zinc-800 text-white border-white'} border p-4 rounded shadow-md`}
      data-testid="test-card"
    >
      <div>
        <div className="flex items-center">
          <input
            id={`checked-checkbox-${getId(url)}`}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e)}
            onClick={(e) => e.stopPropagation()}
            value=""
            className={`${theme === 'dark-mode' ? 'focus:ring-blue-500 bg-gray-100 border-gray-300' : 'focus:ring-blue-600 ring-offset-gray-800 bg-gray-700 border-gray-600'} w-4 h-4 text-blue-600 rounded-sm  focus:ring-2`}
          />
          <label
            htmlFor={`checked-checkbox-${getId(url)}`}
            className={`${theme === 'dark-mode' ? 'text-gray-900' : 'text-gray-300'} ms-2 text-sm font-medium`}
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
