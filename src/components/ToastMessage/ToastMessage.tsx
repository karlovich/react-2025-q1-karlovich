import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { reset } from '../../features/cardStoreSlice';
import CsvExportBtn from '../CsvExportBtn/CsvExportBtn';

export const ToastMessage = () => {
  const dispatch = useDispatch();
  const count = useSelector(
    (state: RootState) => state.cardStore.characters.length
  );

  const onUnselectaAll = () => {
    dispatch(reset());
  };

  return (
    <div
      className={`${
        count > 0 ? 'block' : 'hidden'
      } absolute bottom-4 left-4 bg-black text-white p-4 rounded-lg shadow-lg`}
    >
      <div className="flex gap-4">
        <button
          onClick={onUnselectaAll}
          className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-300"
        >
          Unselect All
        </button>
        <CsvExportBtn />
      </div>
      <div>Count Of Selected Items: {count}</div>
    </div>
  );
};
