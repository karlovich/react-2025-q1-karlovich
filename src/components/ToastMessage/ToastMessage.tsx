import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { reset } from '../../features/cardStoreSlice';

export const ToastMessage = () => {
  const dispatch = useDispatch();
  const count = useSelector(
    (state: RootState) => state.cardStore.characters.length
  );

  const onUnselectaAll = () => {
    dispatch(reset());
  };

  const onDownload = () => {};

  return (
    <div className={count > 0 ? 'block' : 'hidden'}>
      <div>
        <button onClick={onUnselectaAll}>Unselect All</button>
        <button onClick={onDownload}>Download</button>
      </div>
      <div>Count Of Selected Items: {count}</div>
    </div>
  );
};
