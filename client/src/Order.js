import React, { useState } from 'react';
import styled from '@emotion/styled';
import { IoIosCloseCircle } from 'react-icons/io';
import { black, grey } from './utils/colors';

const Order = ({ data, removeOrder, index, handleOrderQuantity }) => {
  const { productId, title, price, image, quantity, stock } = data;
  const [orderPrice, setOrderPrice] = useState(Number(price));
  const [orderQuantity, setOrderQuantity] = useState(Number(quantity));

  const handleClose = () => removeOrder(productId);
  const handleQuantity = (e) => {
    const value = Number(e.target.value);

    if (value < 1 || value > Number(stock)) {
      console.log(`over stock`);
      return;
    }

    const newOrderPrice = value * price;
    setOrderPrice(newOrderPrice);
    setOrderQuantity(value);
    handleOrderQuantity(productId, value, newOrderPrice);
  };

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
        <div className="order__element">
          <label htmlFor="title">
            <p>Title:</p>
            <input
              type="text"
              name={`title[${index}]`}
              id="quantity"
              value={`${title.toUpperCase()}`}
              disabled
            />
          </label>
        </div>

        <div className="order__element">
          <label htmlFor="price">
            <p>Price:</p>
            <input
              type="text"
              name={`orderPrice[${index}]`}
              id="price"
              value={orderPrice}
              disabled
            />
          </label>
        </div>
        <div className="order__element">
          <label htmlFor="quantity">
            <p>Quantity</p>
            <input
              type="number"
              name={`quantity[${index}]`}
              id="quantity"
              value={orderQuantity}
              onChange={handleQuantity}
              min="1"
            />
          </label>
        </div>
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
    display: flex;
    flex-basis: 60%;
    flex-direction: column;

    & .order__element {
      label {
        display: flex;
        justify-content: space-around;
      }

      input {
        display: inline-block;
        box-sizing: border-box;
        margin-left: 10px;
        width: 100%;
        border-radius: 4px;
        border: none;
        border-bottom: 1px solid #dadce0;
        padding: 10px 15px;
        margin-bottom: 10px;
        font-size: 14px;
      }
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
