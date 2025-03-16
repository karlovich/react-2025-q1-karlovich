import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../shared/types';
import { setUncontrolledFormData } from '../../features/formStoreSlice';
import { useNavigate } from 'react-router';
import { RootState } from '../../app/store';

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

export const UncontrolledFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countriesStore);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data: User = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      country: formData.get('country') as string,
      terms: formData.has('terms'),
      image: '',
    };

    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        dispatch(setUncontrolledFormData(data));
        navigate('/');
      })
      .catch((yupError: yup.ValidationError) => {
        const newErrors: Record<string, string> = {};
        yupError.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      });
  };

  return (
    <>
      <h1>Uncontrolled Form</h1>
      <form onSubmit={onSubmit}>
        <div className="p-2">
          <label htmlFor="input-name-2">Name: </label>
          {errors.name && (
            <label className="text-amber-500">{errors.name}</label>
          )}
          <input
            type="text"
            id="input-name-2"
            name="name"
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
        </div>
        <div className="p-2">
          <label htmlFor="input-age-2">Age: </label>
          {errors.age && <label className="text-amber-500">{errors.age}</label>}
          <input
            id="input-age-2"
            type="number"
            name="age"
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
        </div>
        <div className="p-2">
          <label htmlFor="input-email-2">Email: </label>
          {errors.email && (
            <label className="text-amber-500">{errors.email}</label>
          )}
          <input
            id="input-email-2"
            type="email"
            name="email"
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
        </div>
        <div className="p-2">
          <label>Gender: </label>
          {errors.gender && (
            <label className="text-amber-500">{errors.gender}</label>
          )}
          <select
            name="gender"
            className="border border-black p-2 rounded bg-white text-black w-full"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="p-2">
          <label htmlFor="input-country-2">Country: </label>
          {errors.country && (
            <label className="text-amber-500">{errors.country}</label>
          )}
          <input
            id="input-country-2"
            list="countries"
            name="country"
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
          <datalist id="countries">
            {Object.entries(countries).map(([code, name]) => (
              <option key={code} value={name} />
            ))}
          </datalist>
        </div>
        <div className="p-2">
          <label>
            <input type="checkbox" name="terms" /> Accept Terms & Conditions
          </label>
          {errors.terms && (
            <label className="text-amber-500">{errors.terms}</label>
          )}
        </div>
        <div className="p-2">
          <label htmlFor="input-picture-2">Image: </label>
          {errors.image && (
            <label className="text-amber-500">{errors.image}</label>
          )}
          <input
            id="input-picture-1"
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            className="border border-black p-2 rounded bg-white text-black w-full"
          />
        </div>
        <div className="p-2">
          <button
            type="submit"
            className="bg-slate-950 text-white hover:bg-slate-700 font-bold p-2 rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
