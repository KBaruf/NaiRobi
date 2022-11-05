import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProductsContext } from '../../context/products_context';
import { single_product_url as url } from '../../utils/constants';
import { formatPrice } from '../../utils/helpers';
import { Loading, Error, ProductImages, AddToCart, Stars, PageHero } from '../../components';
import styled from 'styled-components';
import Link from 'next/link';

const SingleProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { single_product_loading: loading, single_product_error: error, single_product: product, fetchSingleProduct } = useProductsContext();
  useEffect(() => {
    fetchSingleProduct(`${url}${slug}`);
  }, [slug]);

  // redirect user to Homepage if error

  // useEffect(() => {
  //   if (error) {
  //     setTimeout(() => {
  //       router.push('/');
  //     }, 3000);
  //   }
  // }, []);

  if (loading) {
    return <Loading />;
  }
  // if (error) {
  //   return <Error />;
  // }

  const { name, price, description, stock, stars, reviews, id: sku, company, images } = product;
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link href='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            <Stars reviews={reviews} stars={stars} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='description'>{description}</p>
            <p className='info'>
              <span>Available:</span>
              {stock > 0 ? 'In stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU:</span>
              {sku}
            </p>
            <p className='info'>
              <span>Company:</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
