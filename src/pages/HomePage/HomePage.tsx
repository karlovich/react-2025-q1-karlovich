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
              ? 'bg-amber-500 w-1/2'
              : 'bg-transparent w-1/2'
          }
        >
          <h2 className="font-bold">Hook form data</h2>
          <p>User Name: {hookFormUser?.name}</p>
          <p>User Age: {hookFormUser?.age}</p>
          <p>User Email: {hookFormUser?.email}</p>
          <p>User Gender: {hookFormUser?.gender}</p>
          <p>User Country: {hookFormUser?.country}</p>
          <p>User Password: {hookFormUser?.password}</p>
          <p>User Terms: {hookFormUser?.terms && 'Accepted'}</p>
          <p>
            User Image:
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
              ? 'bg-lime-500 w-1/2'
              : 'bg-transparent w-1/2'
          }
        >
          <h2 className="font-bold">Uncontrolled form data</h2>
          <p>User Name: {uncontrolledFormUser?.name}</p>
          <p>User Age: {uncontrolledFormUser?.age}</p>
          <p>User Email: {uncontrolledFormUser?.email}</p>
          <p>User Gender: {uncontrolledFormUser?.gender}</p>
          <p>User Country: {uncontrolledFormUser?.country}</p>
          <p>User Password: {uncontrolledFormUser?.password}</p>
          <p>User Terms: {hookFormUser?.terms && 'Accepted'}</p>
          <p>
            User Image:
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
