import React from 'react';
import styled from 'styled-components';
import { PageHero, StripeCheckout } from '../components';
import { getSession } from 'next-auth/client';
// extra imports
import { useCartContext } from '../context/cart_context';
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CheckoutPage = () => {
  const { cart } = useCartContext();
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
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>Your Cart is Empty</h2>
            <Link href='/products' className='btn'>
              Add Items
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
