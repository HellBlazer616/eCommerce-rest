/* eslint-disable no-return-assign */
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AiOutlineHeart } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import { orange, black } from './utils/colors';
import trolley from './assets/trolley.svg';

const Card = ({ product, addToCart }) => {
  const { _id, title, stock, unit, price, image } = product;
  const [click, setClick] = useState(false);
  const heart = useRef(null);

  const handleCartClick = () => {
    console.log(localStorage.getItem('asd'));
    setClick(true);
    addToCart({
      productId: _id,
      title,
      price,
      quantity: 1,
      image,
      stock,
      totalPrice: price,
    });
    setTimeout(() => setClick(false), 1000);
  };

  const handleHeart = () => {
    if (
      heart.current.style.color === '' ||
      heart.current.style.color === 'black'
    ) {
      return (heart.current.style.color = 'red');
    }

    return (heart.current.style.color = 'black');
  };

  return (
    <CardElement>
      <div className="image">
        <LazyLoad
          height={200}
          offset={100}
          once
          placeholder={
            <img
              src={`${process.env.PUBLIC_URL}/uploads/200.png`}
              alt="product"
            />
          }
        >
          <img
            //
            src={`${process.env.PUBLIC_URL}/uploads/${image}`}
            alt="product"
          />
        </LazyLoad>
        <button ref={heart} type="button" onClick={handleHeart}>
          <i>
            <AiOutlineHeart />
          </i>
        </button>
      </div>
      <div className="content">
        <div className="content__info">
          <h3>{title.toUpperCase()}</h3>
          <p>
            Stock: {stock}
            {unit}
          </p>
          <p>Quantity: 1{unit}</p>
          <p>${price}</p>
        </div>
        <div className="content__button">
          <button type="button" onClick={handleCartClick}>
            <i>
              {click ? (
                <TiTick style={{ width: '50px', height: '50px' }} />
              ) : (
                <img
                  src={trolley}
                  alt="trolley"
                  style={{ width: '50px', height: '50px' }}
                />
              )}
              Cart Button
            </i>
          </button>
        </div>
      </div>
    </CardElement>
  );
};

const CardElement = styled.div`
  display: flex;
  margin: 1rem 4rem;
  flex-direction: column;
  padding: 10px;
  min-width: 250px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  transition: 0.18s all ease;

  &:hover {
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.25);
  }

  & .image {
    display: flex;
    padding: 10px 0;
    justify-content: space-between;

    button {
      height: 30px;
      border: none;
      outline-color: ${orange};
      color: ${black};
      i {
        font-size: 20px;
        pointer-events: none;
      }
    }

    img {
      width: 200px;
      height: 200px;
    }
  }

  & .content {
    display: flex;
    justify-content: space-between;
  }

  & .content__button {
    display: flex;
    align-items: flex-end;

    button {
      border-radius: 50%;
      background: ${orange};
      border: 1px solid ${orange};
      outline-color: ${orange};
      cursor: pointer;
      font-size: 0;
line-height: 0;

      & :active {
        transform: scale(0.95);
      }
    }
  }
`;

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Card;
