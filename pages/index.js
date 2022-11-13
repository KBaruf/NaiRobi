import React from 'react';
import { FeaturedProducts, Hero, Services, Contact } from '../components';
import Loading from '../components/Loading';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useState();
  useEffect(() => {
    getSession().then(() => {
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
