import { LOAD_PRODUCTS, SET_LISTVIEW, SET_GRIDVIEW, UPDATE_SORT, SORT_PRODUCTS, UPDATE_FILTERS, FILTER_PRODUCTS, CLEAR_FILTERS } from '../actions';
import products_reducer from './products_reducer';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((prod) => prod.price);
    maxPrice = Math.max(...maxPrice);

    return { ...state, all_products: [...action.payload], filtered_products: [...action.payload], filters: { ...state, max_price: maxPrice, price: maxPrice } };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  // Sort products alphabetically and price based
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }

    if (sort === 'name-az') {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'name-za') {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filtered_products: tempProducts };
  }

  // Products Filter Handler

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];
    // text filter
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // category filter
    if (category !== 'all' && category) {
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      });
    }
    // company filter
    if (company !== 'all' && company) {
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      });
    }

    // colors filter
    if (color !== 'all' && color) {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((col) => col === color);
      });
    }

    // price filter
    tempProducts = tempProducts.filter((product) => {
      return product.price <= price;
    });

    // shipping filter
    if (shipping) {
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
