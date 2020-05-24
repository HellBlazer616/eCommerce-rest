import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from '@reach/router';
import { TiThMenuOutline } from 'react-icons/ti';
import { IoIosCloseCircle } from 'react-icons/io';
import trolley from './assets/trolley.svg';
import { black, orange, grey } from './utils/colors';

const Navbar = ({ handleCart }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Nav open={open}>
        <div className="left">
          <ul>
            <li>
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link" to="/product">
                Product
              </Link>
            </li>
            <li>
              <Link className="link" to="/login">
                Log in
              </Link>
            </li>
          </ul>
          <div>
            <button type="button" onClick={handleCart}>
              <i>
                <img
                  src={trolley}
                  alt="trolley"
                  style={{ width: '50px', height: '50px' }}
                />
              </i>
            </button>
          </div>
        </div>
        <div className="right">
          <button type="button" onClick={() => setOpen(!open)}>
            <i>
              {open ? (
                <IoIosCloseCircle
                  style={{ width: '30px', height: '30px', color: black }}
                />
              ) : (
                <TiThMenuOutline
                  style={{ width: '30px', height: '30px', color: black }}
                />
              )}
            </i>
          </button>
        </div>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  background: ${black};
  justify-content: space-between;

  button {
    display: block;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }

  & .left {
    display: flex;
    flex-basis: 90%;
    justify-content: space-between;
    ul {
      display: flex;
      justify-content: space-between;
      list-style: none;
      display: flex;
      flex-basis: 20%;
      font-weight: 400;
      color: ${grey};
      padding: 0 10px;

      li {
        cursor: pointer;

        & :hover {
          color: ${orange};
        }
      }
    }

    & .link {
      text-decoration: none;
      color: inherit;
    }
  }

  & .right {
    display: flex;
    flex-basis: 5%;
    justify-content: flex-end;
    & :first-of-type {
      display: none;
    }
  }

  @media only screen and (max-width: 1024px) {
    flex-direction: ${({ open }) => (open ? 'column-reverse' : 'row')};
    min-height: ${({ open }) => (open ? '300px' : 'initial')};

    & .left {
      flex-basis: ${({ open }) => (open ? 'inherit' : '10%')};
      flex-grow: ${({ open }) => (open ? '1' : '0')};
      flex-direction: column;
      justify-content: space-evenly;
      padding: 0 10px;
      ul {
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        flex-grow: 1;
        & :not(:first-of-type) {
          display: ${({ open }) => (open ? 'flex' : 'none')};
        }
      }
      div {
        display: ${({ open }) => (open ? 'flex' : 'none')};
        justify-content: center;
      }
    }

    & .right {
      & :first-of-type {
        display: block;
      }
    }
  }
`;

export default Navbar;
