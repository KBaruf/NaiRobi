import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
// extra imports
import { useCartContext } from '../context/cart_context';
import Link from 'next/link';

const CheckoutPage = () => {
  return (
    <main>
      <PageHero className='checkout' title={'Checkout'} />
      <Wrapper className='page'>
        <h1>Checkout Here</h1>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
