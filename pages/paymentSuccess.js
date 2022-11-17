import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Loading } from '../components';
const Paymentsuccess = () => {
  const { shipping_fee, total_amount, clearCart } = useCartContext();
  const totalPayment = shipping_fee + total_amount;
  const { data: session, loading } = useSession();
  const router = useRouter();
  if (typeof window !== 'undefined') {
    if (!session) {
      window.location.href = '/';
    }
    // else {
    //   window.location.href = '/';
    // }
  }

  clearCart();
  return (
    <Wrapper className='card'>
      <div className='center'>
        <span className='checkmark'>✓</span>
      </div>
      <h1>Success</h1>
      <p>Your payment was proccessed successfully</p>
      {/* <div style={{ paddingTop: '2rem' }}>
        <h4>Redirecting to HomePage...</h4>
      </div> */}
      <button
        className='btn'
        onClick={() => {
          router.push({ pathname: '/' });
        }}
      >
        Back to Homepage{' '}
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  text-align: center;
  padding: 40px 0;
  background: #ebf0f5;

  .center {
    border-radius: 12.5rem;
    background: #f8faf5;
    width: 200px;
    margin: 0 auto;
  }
  h1 {
    color: #88b04b;
    font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
    font-weight: 900;
    font-size: 40px;
    margin-bottom: 10px;
  }
  p {
    color: #404f5e;
    font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin: 0;
  }
  span {
    color: #9abc66;
    font-size: 100px;
    line-height: 200px;
    margin-left: -15px;
  }
  .card {
    background: white;
    padding: 60px;
    border-radius: 4px;
    box-shadow: 0 2px 3px #c8d0d8;
    display: inline-block;
    margin: 0 auto;
  }
`;

export default Paymentsuccess;
