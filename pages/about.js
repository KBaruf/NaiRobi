import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import Image from 'next/image';
import aboutImg from '../assets/hero-bcg.jpeg';

const AboutPage = () => {
  return (
    <main>
      <PageHero title={'about'} />
      <Wrapper className='page section section-center'>
        <Image src={aboutImg} alt='a nice desk' />
        <article>
          <div className='title'>
            <h2>
              Our Story
              <div className='underline'></div>
            </h2>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit iure, quo quisquam dolorem excepturi temporibus aliquam! Delectus mollitia distinctio corporis soluta cupiditate autem, repellat aspernatur in neque cumque aperiam accusantium? obcaecati suscipit labore? Ad, iusto? Laudantium magni dicta, hic cupiditate minus itaque!</p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
