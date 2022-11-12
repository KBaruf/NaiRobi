import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import Link from 'next/link';
import { CartContent, PageHero } from '../components';

const CartPage = () => {
  const { cart } = useCartContext();
  // if (typeof window !== 'undefined') {
  if (cart?.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Your cart is empty</h2>
          <Link href='/products' className='btn'>
            Add items
          </Link>
        </div>
      </Wrapper>
    );
    // }
  }
  return (
    <main>
      <PageHero title='cart' />
      <Wrapper className='page'>
        <CartContent />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default CartPage;