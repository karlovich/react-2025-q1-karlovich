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
  const [higlightUncontrolledUser, setHiglightUncontrolledUser] =
    useState(false);

  useEffect(() => {
    setHiglightHookFormUser(true);
    setTimeout(() => {
      setHiglightHookFormUser(false);
    }, 3000);
  }, [hookFormUser]);

  useEffect(() => {
    setHiglightUncontrolledUser(true);
    setTimeout(() => {
      setHiglightUncontrolledUser(false);
    }, 3000);
  }, [uncontrolledFormUser]);

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
          <p>
            Hook User Image:
            <img
              width={200}
              height={200}
              src={hookFormUser?.image}
              alt="Hook Form Img"
            />
          </p>
        </div>
        <div
          className={
            higlightUncontrolledUser && uncontrolledFormUser
              ? 'bg-lime-500'
              : 'bg-transparent'
          }
        >
          <p>Uncontrolled User Name: {uncontrolledFormUser?.name}</p>
          <p>Uncontrolled User Age: {uncontrolledFormUser?.age}</p>
          <p>Uncontrolled User Email: {uncontrolledFormUser?.email}</p>
          <p>Uncontrolled User Gender: {uncontrolledFormUser?.gender}</p>
          <p>Uncontrolled User Country: {uncontrolledFormUser?.country}</p>
          <p>Uncontrolled User Terms: {uncontrolledFormUser?.terms}</p>
          <p>
            Uncontrolled User Image:
            <img
              width={200}
              height={200}
              src={uncontrolledFormUser?.image}
              alt="Uncontrolled Form Img"
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
