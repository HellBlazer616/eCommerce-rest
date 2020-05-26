/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { IoIosCloseCircle } from 'react-icons/io';
import { black, grey } from './utils/colors';
import Navbar from './Navbar';
import Card from './Card';
import Order from './Order';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleOrderSubmit = (event) => {
    event.preventDefault();

    const data = orders.map((order) => {
      const { productId, title, quantity, totalPrice: orderPrice } = order;

      const requiredData = { productId, title, quantity, orderPrice };
      console.log(requiredData);
      return requiredData;
    });

    const obj = {
      orderItems: data,
    };

    const payload = JSON.stringify(obj);

    async function setData() {
      await fetch('/api/v1/order/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('eCommerce')}`,
        },
        body: payload,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        });
    }
    setData();
    setOrders([]);
  };
  // toggle cart
  const openCart = () => {
    console.log(open);
    setOpen(!open);
  };

  // add order to cart
  const addToCart = (value) => {
    if (orders.length === 0) {
      setOrders(orders.slice().concat(value));
      return;
    }
    const checkDuplicate = orders.findIndex((element) => {
      return element._id === value.productId;
    });
    // if a placed item is sent again that product is removed
    if (checkDuplicate > -1) {
      const remove = [...orders];
      remove.splice(checkDuplicate, 1);
      setOrders(remove);
    } else {
      setOrders(orders.slice().concat(value));
    }
  };
  // remover order from cart
  const removeOrder = (id) => {
    const ItemToRemove = orders.findIndex((element) => {
      return element._id === id;
    });
    orders[ItemToRemove].setToCart = !orders[ItemToRemove].setToCart;
    const orderCopy = orders.slice();
    orderCopy.splice(ItemToRemove, 1);
    setOrders(orderCopy);
  };

  // setting order quantity
  const handleOrderQuantity = (id, quantity, price) => {
    console.log(`id ${id} quantity ${quantity}`);
    const targetItem = orders.findIndex((element) => {
      return element.productId === id;
    });

    orders[targetItem].quantity = quantity;
    orders[targetItem].totalPrice = price;
  };

  // fetching products from database
  useEffect(function loadProductData() {
    async function fetchData() {
      const product = await fetch('api/v1/product/get?').then((response) =>
        response.json()
      );

      setProducts(product.data);
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar openCart={openCart} />
      <Wrapper>
        <Cart open={open}>
          <div className="cart-wrapper">
            <button type="button" onClick={openCart}>
              <i>
                <IoIosCloseCircle />
              </i>
            </button>
            <form onSubmit={handleOrderSubmit}>
              {orders.map((order, index) => {
                return (
                  <Order
                    key={order.productId}
                    data={order}
                    removeOrder={removeOrder}
                    index={index}
                    handleOrderQuantity={handleOrderQuantity}
                  />
                );
              })}
              {orders.length > 0 ? (
                <input className="submit" type="submit" value="Place Order" />
              ) : (
                <input className="submit" type="submit" value="Empty Order" />
              )}
            </form>
          </div>
        </Cart>
        <Row>
          {products.map((product) => {
            return (
              // eslint-disable-next-line no-underscore-dangle
              <Card key={product._id} product={product} addToCart={addToCart} />
            );
          })}
        </Row>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  min-height: 94vh;
  background: ${grey};
  color: ${black};
  /* max-width: 1500px;
  margin: auto; */
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  color: black;
`;
const Cart = styled.aside`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: absolute;
  min-height: 50vh;
  width: 30vw;
  right: 0;
  background: ${grey};
  padding: 2rem;
  flex-direction: column;
  border: 1px solid #dadce0;
  max-height: 80vh;
  overflow-y: scroll;

  & .cart-wrapper {
    display: flex;
    flex-direction: column;

    button {
      align-self: flex-end;
      border: none;
      i {
        font-size: 30px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      & .submit {
        display: inline-block;
        box-sizing: border-box;
        margin-left: 10px;
        width: 60%;
        border-radius: 4px;
        border: none;
        border-bottom: 1px solid #dadce0;
        padding: 10px 15px;
        margin-bottom: 10px;
        font-size: 14px;
        background: ${black};
        color: ${grey};
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    width: 50vw;
  }
`;

export default Product;
