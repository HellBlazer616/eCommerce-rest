import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Link } from '@reach/router';
import { grey } from './utils/colors';
import enter from './assets/enter.svg';
import { Log, Content } from './utils/FormComponent';

const Login = () => {
  const { register, handleSubmit, errors } = useForm({});
  const onSubmit = async (data) => console.log(data);
  console.log(errors.password);
  //
  return (
    <Wrapper>
      <Log>
        <form className="form-control" onSubmit={(e) => e.preventDefault()}>
          <h1>Log in to your account</h1>
          <label htmlFor="mail">
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

          <input
            className="submit"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          />
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{' '}
            <Link className="link" to="/register">
              Sign up
            </Link>
          </p>
        </form>
      </Log>
      <Content>
        <img src={enter} alt="logging" />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${grey};
  display: flex;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

export default Login;
