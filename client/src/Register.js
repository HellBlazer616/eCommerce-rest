import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { grey } from './utils/colors';
import registerSvg from './assets/registerSvg.svg';
import { Log, Content } from './utils/FormComponent';

const Register = () => {
  const { register, handleSubmit, errors, getValues } = useForm({});
  const onSubmit = async (data) => console.log(data);
  console.log(errors.password);
  //
  return (
    <Wrapper>
      <Log>
        <form className="form-control" onSubmit={(e) => e.preventDefault()}>
          <h1>Sign up</h1>

          <label htmlFor="name">
            Name
            <input
              type="text"
              placeholder="name"
              name="name"
              ref={register({
                required: 'You must specify an name',
                min: {
                  value: 3,
                  message: 'The name must be 3 characters or more',
                },
              })}
            />
          </label>

          {errors.name && <p className="error">You must specify a name</p>}

          <label htmlFor="email">
            Email
            <input
              type="text"
              placeholder="email"
              name="email"
              ref={register({
                required: 'You must specify an email',
                pattern: /^\S+@\S+$/i,
              })}
            />
          </label>

          {errors.email && <p className="error">You must specify an email</p>}

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              ref={register({
                required: 'You must specify a password',
                min: 6,
                validate: (value) => {
                  const message =
                    'Password must contain at least one letter, at least one number, and be longer than six characters';
                  const regex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/i;
                  if (regex.test(value)) {
                    return true;
                  }
                  return message;
                },
              })}
            />
          </label>

          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              ref={register({
                required: 'You must specify the confirm Password',

                validate: (value) => {
                  const message = 'confirm password do not match the password';
                  const password = getValues('password');
                  if (value === password) return true;
                  return message;
                },
              })}
            />
          </label>

          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}

          <input
            className="submit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </Log>
      <Content>
        <img src={registerSvg} alt="logging" />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${grey};
  display: flex;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

export default Register;
