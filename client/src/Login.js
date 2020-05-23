import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { Link } from '@reach/router';
import { black, grey, orange, error } from './utils/colors';
import enter from './assets/enter.svg';

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
            Don't have an account?{' '}
            <Link className="link" to="register">
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

const Log = styled.div`
  display: flex;
  flex-grow: 1.5;
  background: ${black};
  min-width: 250px;
  justify-content: center;

  h1 {
    color: ${grey};
  }

  & .form-control {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 50%;

    & .link {
      text-decoration: none;
      color: ${orange};
    }

    & .error {
      color: ${error};
      font-size: 12px;
      margin: 0;
    }

    p {
      color: ${grey};
    }

    & .submit {
      font-size: 20px;
      margin-top: 1rem;
    }

    input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      border-radius: 4px;
      border: 1px solid white;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 14px;
    }

    label {
      line-height: 2;
      text-align: left;
      display: block;
      margin-bottom: 13px;
      margin-top: 20px;
      color: white;
      font-size: 16px;
      font-weight: 200;
    }
  }
`;

const Content = styled.div`
  flex-grow: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 40%;
    height: auto;
  }
  overflow: hidden;

  min-width: 350px;
`;

export default Login;
