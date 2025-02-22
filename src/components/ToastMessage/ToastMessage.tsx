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
    <div className={count > 0 ? 'block' : 'hidden'}>
      <div>
        <button onClick={onUnselectaAll}>Unselect All</button>
        <CsvExportBtn />
      </div>
      <div>Count Of Selected Items: {count}</div>
    </div>
  );
};
