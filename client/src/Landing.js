import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import { black, grey, orange } from './utils/colors';

function Landing() {
  return (
    <Wrapper>
      <Hero>
        <h1>Awesome Site</h1>
        <h2>Your one stop Shopping Destination</h2>
      </Hero>
      <Content>
        <Button to="/product" type="button" className="primary">
          Store
        </Button>
        <Button to="/login" type="button" className="secondary">
          Log in
        </Button>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${black};
  height: 100vh;
  color: ${grey};
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 3;
  clip-path: polygon(100% 15%, 100% 70%, 0 90%, 0 35%);
  background: ${grey};
  color: ${black};
  h1 {
    font-size: calc(16px + 3.5vw);
    margin: 0;
    color: ${orange};
    cursor: default;
  }
  h2 {
    font-size: calc(16px + 1vw);
    margin: 0;
    word-spacing: 5px;
    margin-top: 0.5rem;
    cursor: default;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 0 1rem;

  & .primary {
    background: ${orange};
    color: ${grey};
    :active {
      background: ${grey};
      color: ${orange};
    }
  }
  & .secondary {
    background: ${black};
    color: ${orange};
    :active {
      background: ${orange};
      color: ${black};
    }
  }
`;

const Button = styled(Link)`
  cursor: pointer;
  width: 20%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0.5rem;
  font-family: inherit;
  font-weight: 800;
  text-align: center;
  font-size: calc(16px + 2vw);
  border: 0px;
  transition: all 0.3s ease-in-out;
  padding: 10px;
  text-decoration: none;

  @media (max-width: 576px) {
    width: 30%;
    font-size: calc(16px + 1vw);
  }
  :focus {
    outline: 2px solid ${black};
  }
  :hover {
    transform: scale(1.05);
  }
  :active {
    color: #ffffff;
    background: ${black};
  }
`;

export default Landing;
