import React, {useState} from 'react'
import styled from '@emotion/styled';
import { black, grey } from './utils/colors';

const Cart = ({open}) => {
  
  return (
    <CartElement open={open}>CartElement</CartElement>
  )
}

const CartElement = styled.aside`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: absolute;
  min-height: 90vh;
  width: 30vw;
  right: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
  background: ${grey};
`;

export default Cart
