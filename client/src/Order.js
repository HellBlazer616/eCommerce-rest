import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IoIosCloseCircle } from 'react-icons/io';
import { black, grey } from './utils/colors';

const Order = ({ data, removeOrder }) => {
  const { _id, title, stock, unit, price, image } = data;

  const handleClose = () => removeOrder(_id);

  return (
    <OrderElement>
      <div className="order__image">
        <img
          src={`${process.env.PUBLIC_URL}/uploads/${image}`}
          alt="order"
          style={{ width: '50px', height: '50px' }}
        />
      </div>
      <div className="order__info">
        <h3>{title}</h3>
        <p>
          ${price} per {unit}
        </p>
        <label htmlFor="quantity">
          <input type="number" name="quantity" id="quantity" placeholder="1" />
        </label>
      </div>
      <div className="order__close">
        <button type="button" onClick={handleClose}>
          <i>
            <IoIosCloseCircle />
          </i>
        </button>
      </div>
    </OrderElement>
  );
};

const OrderElement = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #dadce0;
  margin-bottom: 1rem;
  flex-basis: 100%;

  @media only screen and (max-width: 1024px) {
    flex-direction: column;
  }

  & .order__image {
    flex-basis: 10%;
    align-self: center;

    @media only screen and (max-width: 1024px) {
      align-self: flex-start;
    }
    img {
      border-radius: 50%;
    }
  }
  & .order__info {
    flex-basis: 60%;

    h3 {
      margin: 0;
    }

    input {
      display: block;
      box-sizing: border-box;
      width: 70%;
      border-radius: 4px;
      border: 1px solid #dadce0;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 14px;
    }
  }

  & .order__close {
    button {
      border: none;
    }
    i {
      font-size: 30px;
    }
  }
`;

export default Order;
