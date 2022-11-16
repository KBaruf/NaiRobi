import Link from 'next/link';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Loading } from '../components';
import { useSession } from 'next-auth/react';

const Authentication = () => {
  const [activeAcc, setActiveAcc] = useState(true);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [accSuccess, setAccSuccess] = useState(false);
  const { data: session, loading } = useSession();

  // Create User and Display error messages
  async function createUserHandler(email, password) {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
        }, 3000);
      }
      if (response.status === 200) {
        setSuccessAlert(false);
        setErrorAlert(true);
        setErrorText('Account Exists, Please Login');
        setTimeout(() => {
          setErrorAlert(false);
        }, 3600);
        setActiveAcc(true);
      }
      if (response.status === 100) {
        setSuccessAlert(false);
        setErrorAlert(true);
        setErrorText('Wrong Password!');
        setTimeout(() => {
          setErrorAlert(false);
        }, 3600);
      }
      // console.log(response);
      if (!response.ok) {
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
        }, 3600);
        if (response.status === 422) {
          setErrorText('Please Enter a Valid Email!');
        }
        if (response.status === 201) {
          setErrorText('Password needs to be atleat 6 characters!');
        }

        throw new Error('Something went wrong');
      }
      return data;
    } catch (error) {
      {
        errorAlert && setErrorText(error);
      }
    }
  }

  const emailSigninRef = useRef();
  const passSigninRef = useRef();
  const emailSignupRef = useRef();
  const passSignupRef = useRef();

  // Sign User In
  const signinHandler = async (event) => {
    event.preventDefault();
    const signinEmail = emailSigninRef.current.value.toLowerCase();
    const signinPassword = passSigninRef.current.value.toLowerCase();

    if (!activeAcc) return;

    const result = await signIn('credentials', {
      redirect: false,
      email: signinEmail,
      password: signinPassword,
    });
    // console.log(result);
    // Handle Login Error

    setErrorAlert(true);
    setAccSuccess(false);
    setErrorText(result.error);
    setTimeout(() => {
      setErrorAlert(false);
    }, 3600);

    // user is authenticated
    if (result.ok && !result.error) {
      emailSigninRef.current.value = '';
      passSigninRef.current.value = '';
      setSuccessAlert(true);
      setAccSuccess(false);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 3600);

      await signIn('credentials', {
        callbackUrl: `${window.location.origin}/checkout`,
        email: signinEmail,
        password: signinPassword,
      });
    }

    if (signinEmail.length === 0) {
      setErrorAlert(true);
      setErrorText('Nothing was Entered!');
      setTimeout(() => {
        setErrorAlert(false);
      }, 2000);
      return;
    }
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    if (!activeAcc) {
      const signupEmail = emailSignupRef.current.value.toLowerCase();
      const signupPassword = passSignupRef.current.value.toLowerCase();
      const result = await createUserHandler(signupEmail, signupPassword);

      if (signupPassword.length < 6) {
        setErrorAlert(true);
        setSuccessAlert(false);
        setErrorText('Password needs to be atleat 6 characters');
        setTimeout(() => {
          setErrorAlert(false);
        }, 3600);
        return;
      }
      if (result) {
        emailSignupRef.current.value = '';
        passSignupRef.current.value = '';
        setActiveAcc(true);
        setTimeout(() => {
          setAccSuccess(true);
        }, 3200);
      }
    }
  };

  if (activeAcc) {
    return (
      <Wrapper>
        <div className='login-form'>
          {successAlert && <p className='success'>success</p>}
          {accSuccess && <p className='success'>Please Login to Continue!</p>}
          {errorAlert && <p className='alert'>{errorText}</p>}
          <p style={{ textAlign: 'center', backgroundColor: '#eee' }}>
            <strong>test account: </strong>[email: test@test.com || password: 123456]
          </p>
          <button className='  create-account' type='button' onClick={() => setActiveAcc(false)}>
            Create Account
          </button>

          <h2>Login</h2>
          <form onSubmit={signinHandler} className='section'>
            <input autoFocus type='text' title='email' placeholder='johnsmith@email.com' ref={emailSigninRef} />
            <input type='password' title='password' placeholder='password' ref={passSigninRef} />
            <div className='box'>
              <button type='submit' className='btn'>
                Sign in
              </button>

              {/* <Link className='forgot' href='/reset-password'>
                Forgot password?
              </Link> */}
            </div>
          </form>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div className='login-form'>
          {successAlert && <p className='success'>success</p>}
          {errorAlert && <p className='alert'>{errorText} </p>}

          <button className='  create-account' type='button' onClick={() => setActiveAcc(true)}>
            Login
          </button>
          <h2>sign up</h2>
          <form onSubmit={signUpHandler} className='section'>
            <input autoFocus type='text' title='email' placeholder='johnsmith@email.com' ref={emailSignupRef} />
            <input type='password' title='password' placeholder='password' ref={passSignupRef} />
            <div className='box'>
              <button type='submit' className='center btn'>
                sign up
              </button>
            </div>
          </form>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.section`
  min-height: 100vh;
  place-items: center;
  display: grid;
  background-color: var(--clr-white);

  .login-form {
    width: 40%;
    min-width: 20rem;
    max-width: 30rem;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 11px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    box-shadow: 0 0 2.4rem rgb(0 0 0 / 8%);

    form {
      display: block;
      width: 100%;
      padding: 2rem;
    }

    h2 {
      color: var(--clr-primary-1);
      display: block;
      width: 100%;
      text-align: center;
      padding: 0.75em 1em 0.75em 1.5em;
      margin: 0;
      font-size: 2.4rem;
    }

    input {
      display: block;
      margin: auto auto;
      width: 100%;
      font-size: 1.4rem;
      margin-bottom: 1em;
      padding: 0.5em 0;
      border: none;
      border-bottom: 1px solid #eaeaea;
      &:focus {
        outline: none;
      }
      input::placeholder {
        font-family: inherit;
        font-size: 1.5rem;
      }
    }
    .box {
      padding-top: 2rem;
      text-align: center;
    }
    .btn {
      display: inline-block;
      border: 1px solid darken(@blue, 5%);
      padding: 0.5em 2em;
      color: var(--clr-white);
      margin-right: 0.5em;
      box-shadow: inset 0px 1px 0px fadeout(white, 80%);
      &:hover {
        background: lighten(@blue, 5%);
      }
      &:active {
        background: @blue;
        box-shadow: inset 0px 1px 1px fadeout(black, 90%);
      }
      &:focus {
        outline: none;
      }
    }
    .alert {
      background: #fd7e14;
      text-align: center;
      font-size: 1.2rem;
      color: #fff;
    }
    .success {
      text-align: center;
      font-size: 1.2rem;
      background: #b2f2bb;
      color: #fff;
    }
    .forgot {
      color: lighten(@blue, 10%);
      line-height: 0.5em;
      position: relative;
      top: 2.2em;
      text-decoration: none;
      font-size: 1em;
      margin: 0;
      padding: 0;
      float: right;

      &:hover {
        color: darken(@blue, 5%);
      }
      &:active {
      }
    }
  }
  .create-account {
    background: hsl(22, 31%, 94%);
    font-size: 1rem;
    border-radius: 5px;
    margin: 2rem 0.5rem;
    float: right;
    width: 35%;
    color: #333;
    text-transform: uppercase;
    border: none;
    padding: 0.5rem 0rem;
  }
  .create-account:hover {
    background: hsl(22, 31%, 52%);
  }
  @media screen and (max-width: 1100px) {
    .login-form h2 {
      font-size: 2.2rem;
    }
    .create-account {
      font-size: 0.8rem;
      width: 35%;
    }
  }
  @media screen and (max-width: 900px) {
    .login-form h2 {
      font-size: 1.8rem;
    }
    .create-account {
      font-size: 0.7rem;
      width: 35%;
    }
  }
`;

export default Authentication;
