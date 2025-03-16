import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { User } from '../../shared/types';
import { setHookFormData } from '../../features/formStoreSlice';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
  name: yup.string().required('Please type your name'),
});

export const ControlledFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: User) => {
    console.log(data);
    dispatch(setHookFormData(data));
    navigate('/');
  };

  return (
    <>
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="date-input">Name:</label>
        <input
          type="text"
          id="date-input"
          {...register('name')}
          className="border border-black p-2 rounded bg-white text-black w-full"
        />
        {errors.name && <p className="text-amber-500">{errors.name.message}</p>}
        <button
          type="submit"
          className="bg-slate-950 text-white hover:bg-slate-700 font-bold p-2 rounded cursor-pointer"
        >
          Submit
        </button>
      </form>
    </>
  );
};
