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
      <div className="flex">
        <div
          className={
            higlightHookFormUser && hookFormUser
              ? 'bg-amber-500'
              : 'bg-transparent'
          }
        >
          <p>Hook User Name: {hookFormUser?.name}</p>
          <p>Hook User Age: {hookFormUser?.age}</p>
          <p>Hook User Email: {hookFormUser?.email}</p>
          <p>Hook User Gender: {hookFormUser?.gender}</p>
          <p>Hook User Country: {hookFormUser?.country}</p>
          <p>Hook User Terms: {hookFormUser?.terms}</p>
        </div>
        <div>Uncontrolled User Name: {uncontrolledFormUser?.name}</div>
      </div>
    </>
  );
};

export default HomePage;
