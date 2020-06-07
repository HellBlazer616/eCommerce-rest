/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { IoIosCloseCircle } from 'react-icons/io';
import { useAlert } from 'react-alert';
import { navigate } from '@reach/router';
import { black, grey } from './utils/colors';
import Navbar from './Navbar';
import Card from './Card';
import Order from './Order';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const alert = useAlert();

  const handleOrderSubmit = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      alert.error('You need to be logged in');
    }
    if (orders.length === 0) {
      alert.error('You have not placed any order');
      return;
    }

    const data = orders.map((order) => {
      const { productId, title, quantity, totalPrice: orderPrice } = order;
      const requiredData = {
        productId,
        title,
        quantity,
        orderPrice,
      };
      return requiredData;
    });

    const obj = {
      orderItems: data,
      totalPrice: orderTotalPrice,
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
      }).then((response) => {
        if (response.status === 401) {
          alert.error('You need to be logged in');
          setTimeout(() => {
            navigate('login');
          }, 2000);
        }
        response.json();
      });
    }
    setData();
    setOrders([]);
    alert.success('Your Order has been placed');
  };
  // toggle cart
  const openCart = () => {
    setOpen(!open);
  };

  // add order to cart
  const addToCart = (value) => {
    if (!isLoggedIn) {
      alert.error('You need to be logged in');
      return;
    }

    if (orders.length === 0) {
      setOrders(orders.slice().concat(value));
      alert.success(`${value.title} placed in cart.`);
      return;
    }
    const checkDuplicate = orders.findIndex((element) => {
      return element.productId === value.productId;
    });

    // if a placed item is sent again messahe shown
    if (checkDuplicate > -1) {
      alert.info(`${value.title} already in cart.`);
    } else {
      setOrders(orders.slice().concat(value));
      alert.success(`${value.title} placed in cart.`);
    }
  };
  // remover order from cart
  const removeOrder = (id) => {
    const ItemToRemove = orders.findIndex((element) => {
      return element._id === id;
    });

    const orderCopy = orders.slice();
    const removedOrderItem = orderCopy.splice(ItemToRemove, 1);

    alert.show(`${removedOrderItem[0].title} removed from Cart`);
    setOrders(orderCopy);
  };

  // setting order quantity
  const handleOrderQuantity = (id, quantity, price) => {
    const targetItem = orders.findIndex((element) => {
      return element.productId === id;
    });

    const newOrders = [...orders];
    newOrders[targetItem].quantity = quantity;
    newOrders[targetItem].totalPrice = price;

    setOrders(newOrders);
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

  useEffect(
    function isUserLoggedIn() {
      async function fetchData() {
        const token = localStorage.getItem('eCommerce');
        await fetch('/api/v1/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
          .then((response) => {
            if (response.status === 401) {
              alert.error('Your are not logged in');
            }
            return response.json();
          })
          .then((response) => {
            if (response.login === true) {
              setIsLoggedIn(true);
            }
          });
      }
      fetchData();
    },
    [alert]
  );

  useEffect(
    function calculateTotalOrderPrice() {
      const value = orders.reduce((acc, order) => {
        // eslint-disable-next-line no-param-reassign
        acc += order.totalPrice * order.quantity;
        return acc;
      }, 0);

      setOrderTotalPrice(value);
    },
    [orders]
  );

  return (
    <>
      <Navbar
        openCart={openCart}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
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
                <>
                  <p className="bold">Grand Total: {orderTotalPrice}</p>
                  <input className="submit" type="submit" value="Place Order" />
                </>
              ) : (
                <>
                  <p className="bold">Empty Order</p>
                  <p className="bold">Grand Total: {orderTotalPrice}</p>
                </>
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
  overflow-x: hidden;
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
  background-color: rgba(238, 238, 238, 0.7);

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
        cursor: pointer;
      }
      & .bold {
        color: ${black};
        font-weight: 800;
      }
    }
  }

  @media only screen and (max-width: 1024px) {
    width: 80vw;
  }
`;

export default Product;
