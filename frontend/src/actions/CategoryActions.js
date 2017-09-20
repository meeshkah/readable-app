import * as api from '../utils/api';
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

export const fetchCategories = () => (dispatch) => {
  return api
    .getCategories()
    .then((categories) => dispatch(loadCategories(categories.categories)));
};
