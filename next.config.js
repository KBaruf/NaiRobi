/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    REACT_APP_AUTH_STRIPE_PUBLIC: 'pk_test_Mm7nkve67POBdco4a7x2AZKj',
    REACT_APP_AUTH_STRIPE_SECRET: 'sk_test_4XjfNBJK6chY8mT3A6wSCFVk',

    NEXT_PUBLIC_SECRET: '2f1381d7ef038c0a901654c9ba38ea5e',
  },
};
