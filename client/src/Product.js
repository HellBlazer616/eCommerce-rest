import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { black, grey } from './utils/colors';
import Navbar from './Navbar';
import Card from './Card';
import Cart from './Cart';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const openCart = () => {
    setOpen(!open);
   
  };
  const addToCart = (value) =>{
    console.log(value)
  }

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
        <Cart open={open}>Cart</Cart>
        <Row>
          {products.map((product) => {
            // eslint-disable-next-line no-underscore-dangle
            return <Card key={product._id} product={product} addToCart={addToCart} />;
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

export default Product;
