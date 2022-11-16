import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'We are on a mission to provide a high quality funiture in a flexible and reliable way. We want out customers to trust us and feel respected',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'Our vision is to be a leading international furniture manufacturer by offering innovative and superior quality products made completely in America',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: ' Our company was established over 45 years ago by a group of wood crafting enthusiast. We started in Fort Worth Tx, now grown to over 90 location in 10 countries.',
  },
];
