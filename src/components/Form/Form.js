import React from 'react';
import './Form.scss';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <h3>Sign Up</h3>
      <form className="form">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" />
        </div>

        <div>
          <label htmlFor="age">Age:</label>
          <input type="text" name="age" />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="text" name="password" />
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="text" name="confirmPassword" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
