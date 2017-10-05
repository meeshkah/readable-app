import * as api from '../utils/api';
import history from '../history';
import {
  LOAD_CATEGORIES,
} from './types';

const loadCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    payload: {
      categories,
    },
  }
};

export const fetchCategories = (currentCategory = '') => (dispatch) => {
  return api
    .getCategories()
    .then((categories) => {
      if (!categories.categories.find((category) => category.path === currentCategory)) {
        history.push(`/404`);
      }
      dispatch(loadCategories(categories.categories));
    });
};
