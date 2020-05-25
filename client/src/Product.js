/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { black, grey } from './utils/colors';
import Navbar from './Navbar';
import Card from './Card';
import Order from './Order';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);

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
      return element._id === value._id;
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
  // fetching products from database
  useEffect(function loadProductData() {
    async function fetchData() {
      const product = await fetch('api/v1/product/get?').then((response) =>
        response.json()
      );
      // !TODO

      const mutatedProduct = product.data.map((value) => ({
        ...value,
        setToCart: false,
      }));

      setProducts(mutatedProduct);
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar openCart={openCart} />
      <Wrapper>
        <Cart open={open}>
          {orders.map((order) => {
            return (
              <Order key={order._id} data={order} removeOrder={removeOrder} />
            );
          })}
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

  @media only screen and (max-width: 1024px) {
    width: 50vw;
  }
`;
export default Product;
