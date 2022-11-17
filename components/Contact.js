import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Contact = () => {
  const [err, setErr] = useState(false);
  const emailRef = useRef();
  const formHandler = (e) => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };
    const email = emailRef.current.value;
    const checkEmail = validateEmail(email);
    if (email.length === 0 || !checkEmail) {
      e.preventDefault();
      setErr(true);
      return;
    }
    setTimeout(() => {
      emailRef.current.value = '';
    }, 4000);
  };
  return (
    <Wrapper>
      <div className='section-center'>
        <h3>Join our newsletter and get 20% off</h3>
        <div className='content'>
          <p>
            With a little imagination and our expertise, any funiture style is possible. <strong>Join our newsletter</strong> and see the what we've done with just wood, it's unbelievable!{' '}
          </p>
          <form action='https://formspree.io/f/mbjbpbpj' method='POST' className='contact-form'>
            <input type='email' name='email' className='form-input' placeholder='enter your email' ref={emailRef} />
            <button onClick={formHandler} type='submit' className='submit-btn'>
              subscribe
            </button>
            {err && <p style={{ color: 'salmon' }}>Invalid email!</p>}
          </form>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 5rem 0;
  h3 {
    text-transform: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    color: var(--clr-grey-5);
  }
  .contact-form {
    width: 90vw;
    max-width: 500px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  .form-input,
  .submit-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid var(--clr-black);
  }
  .form-input {
    border-right: none;
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
  }
  .submit-btn {
    border-top-right-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
  .form-input::placeholder {
    color: var(--clr-grey-8);
    text-transform: capitalize;
  }
  .submit-btn {
    background: var(--clr-primary-5);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
    transition: var(--transition);
    color: var(--clr-black);
  }
  .submit-btn:hover {
    color: var(--clr-white);
  }
  @media (min-width: 992px) {
    .content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 8rem;
      margin-top: 2rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1280px) {
    padding: 15rem 0;
  }
`;

export default Contact;
