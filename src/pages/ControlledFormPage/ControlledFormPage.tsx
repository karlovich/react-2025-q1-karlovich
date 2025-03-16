import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../shared/types';
import { setHookFormData } from '../../features/formStoreSlice';
import { useNavigate } from 'react-router';
import { RootState } from '../../app/store';

interface UserForm extends Omit<User, 'image'> {
  image?: FileList;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'The first letter should be uppercased')
    .required('Please type your name'),
  age: yup
    .number()
    .positive('Age should be positive')
    .integer('Age should be integer')
    .required('Please type your age'),
  email: yup.string().email('Invalid email').required('Please type your email'),
  gender: yup.string().required('Please specify your gender'),
  country: yup.string().required('Please select a country'),
  terms: yup
    .boolean()
    .required()
    .oneOf([true], ' Please accept T&C before submitting'),
  image: yup
    .mixed<FileList>()
    .optional()
    .test('fileSize', 'Image size exeeds the limit 2MB', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0) {
        return true;
      }
      return value[0].size <= 2000000;
    })
    .test('fileType', 'Fomat is not supported', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0) {
        return true;
      }
      return ['image/png', 'image/jpeg'].includes(value[0].type);
    }),
});

export const ControlledFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countriesStore);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: UserForm) => {
    if (data.image && data.image.length) {
      const file = data.image[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const userData: User = {
          ...data,
          image: reader.result as string,
        };
        dispatch(setHookFormData(userData));
        navigate('/');
      };
    } else {
      const userData: User = {
        ...data,
        image: '',
      };
      dispatch(setHookFormData(userData));
      navigate('/');
    }
  };

  return (
    <>
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-2">
          <label htmlFor="input-name-1">Name: </label>
          {errors.name && (
            <label className="text-amber-500">{errors.name.message}</label>
          )}
          <input
            type="text"
            id="input-name-1"
            {...register('name')}
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
        </div>
        <div className="p-2">
          <label htmlFor="input-age-1">Age: </label>
          {errors.age && (
            <label className="text-amber-500">{errors.age.message}</label>
          )}
          <input
            id="input-age-1"
            type="number"
            {...register('age')}
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
        </div>
        <div className="p-2">
          <label htmlFor="input-email-1">Email: </label>
          {errors.email && (
            <label className="text-amber-500">{errors.email.message}</label>
          )}
          <input
            id="input-email-1"
            type="email"
            {...register('email')}
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
        </div>
        <div className="p-2">
          <label>Gender: </label>
          {errors.gender && (
            <label className="text-amber-500">{errors.gender.message}</label>
          )}
          <select
            {...register('gender')}
            className="border border-black p-2 rounded bg-white text-black w-full"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div className="p-2">
          <label htmlFor="input-country-1">Country: </label>
          {errors.country && (
            <label className="text-amber-500">{errors.country.message}</label>
          )}
          <input
            id="input-country-1"
            list="countries"
            {...register('country')}
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
          <datalist id="countries">
            {Object.entries(countries).map(([code, name]) => (
              <option key={code} value={name} />
            ))}
          </datalist>
        </div>
        <div className="p-2">
          <label htmlFor="input-picture-1">Image: </label>
          {errors.image && (
            <label className="text-amber-500">{errors.image.message}</label>
          )}
          <input
            id="input-picture-1"
            type="file"
            {...register('image')}
            accept="image/png, image/jpeg"
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
        </div>
        <div className="p-2">
          <label>
            <input type="checkbox" {...register('terms')} /> Accept Terms &
            Conditions
          </label>
          {errors.terms && (
            <label className="text-amber-500">{errors.terms.message}</label>
          )}
        </div>
        <div className="p-2">
          <button
            type="submit"
            className={`bg-slate-950 text-white hover:bg-slate-700 font-bold p-2 rounded cursor-pointer ${!isValid && 'hover:bg-zinc-400 bg-zinc-400'}`}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
