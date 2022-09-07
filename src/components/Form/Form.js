import React, { useEffect } from 'react';
import './Form.scss';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().lowercase().required('We can pass our own error message'),
  lastName: yup.string().lowercase().required(),
  email: yup.string().email().lowercase().required(),
  age: yup.number().positive().integer(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

function Form() {
  // register - function, which determines which fields we want to be part of our validation.
  // handleSubmit - like formSubmitHandler.
  // errors - object, containing all the errors. We don't need to grab errors individually.
  // It will grab the errors, which are displayed by yup (schema). And would be stored in the errors object.

  //-----------------------------------------------------
  // yup connection to react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    // Send data to the server
    console.log(data);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <h3>Sign Up</h3>
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" {...register('firstName')} />
          <p>{errors.firstName?.message}</p>
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" {...register('lastName')} />
          <p>{errors.lastName?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input type="text" {...register('age')} />
          <p>{errors.age?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" {...register('password')} />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" {...register('confirmPassword')} />
          <p>{errors.confirmPassword && 'Passwords Should Match!'}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
