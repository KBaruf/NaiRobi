import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
import { getSession } from 'next-auth/client';
// extra imports
import { useCartContext } from '../context/cart_context';
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useState();
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = '/auth';
      } else {
        setIsLoading(false);
      }
    });
  }, []);
  if (isLoading) {
    return <Loading />;
  }

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
