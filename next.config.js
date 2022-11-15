/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        STRIPE_PUBLIC_KEY: 'pk_test_Mm7nkve67POBdco4a7x2AZKj',
        STRIPE_SECRET_KEY: 'sk_test_4XjfNBJK6chY8mT3A6wSCFVk',
        NEXT_PUBLIC_SECRET: '2f1381d7ef038c0a901654c9ba38ea5y',
      },
    };
  }

  return {
    env: {
      NEXT_PUBLIC_SECRET: '2f1381d7ef038c0a901654c9ba38ea5e',
      STRIPE_PUBLIC_KEY: 'pk_test_Mm7nkve67POBdco4a7x2AZKj',
      STRIPE_SECRET_KEY: 'sk_test_4XjfNBJK6chY8mT3A6wSCFVk',
    },
  };
};
