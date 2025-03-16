import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useEffect, useState } from 'react';
const HomePage = () => {
  const hookFormUser = useSelector(
    (state: RootState) => state.formStore.userHookForm
  );

  const uncontrolledFormUser = useSelector(
    (state: RootState) => state.formStore.userUncontrolledForm
  );

  const [higlightHookFormUser, setHiglightHookFormUser] = useState(false);

  useEffect(() => {
    setHiglightHookFormUser(true);
    setTimeout(() => {
      setHiglightHookFormUser(false);
    }, 3000);
  }, [hookFormUser]);

  return (
    <>
      <p className={higlightHookFormUser ? 'bg-amber-500' : 'bg-transparent'}>
        Hook User Name: {hookFormUser?.name}
      </p>
      <p>Uncontrolled User Name: {uncontrolledFormUser?.name}</p>
    </>
  );
};

export default HomePage;
