import React from 'react';
import styled from 'styled-components';
import { Filters, ProductList, Sort, PageHero } from '../components';
import { products_url as url } from '../utils/constants';

const ProductsPage = (props) => {
  const { products } = props;
  console.log(products);
  return <h4>products page</h4>;
};

export async function getStaticProps() {
  const resp = await fetch(url);
  const products = await resp.json();

  return {
    props: { products },
  };
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
