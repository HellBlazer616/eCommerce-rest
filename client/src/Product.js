import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { black, grey } from './utils/colors';
import Navbar from './Navbar';

import Card from './Card';

const Product = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const product = await fetch('api/v1/product/get?').then((response) =>
        response.json()
      );
      setProducts(product.data);
      console.log('hello');
    }

    fetchData();
  }, []);

  const handleCart = () => {
    setOpen(!open);
    console.log(open);
  };
  return (
    <>
      <Navbar handleCart={handleCart} />
      <Wrapper>
        <Cart open={open}>Cart</Cart>
        <Row>
          {products.map((product) => {
            console.log(product.title);
            // eslint-disable-next-line no-underscore-dangle
            return <Card key={product._id} product={product} />;
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
`;

const Cart = styled.aside`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: absolute;
  min-height: 90vh;
  width: 30vw;
  right: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
  background: ${grey};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  color: black;
`;

export default Product;
