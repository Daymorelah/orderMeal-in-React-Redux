import axios from 'axios';
import * as actionTypes from './actionTypes';

const domain = (process.env.NODE_ENV !== 'production')
  ? process.env.DEVELOPMENT_URL : process.env.PRODUCTION_URL;

export const loadMenuSuccess = response => ({
  type: actionTypes.LOAD_MENU_SUCCESS,
  menus: response.menus,
  pagination: response.paginationMetaData,
});

export const noMenuTypeYet = menuType => ({
  type: actionTypes.NO_MENU_TYPE_YET,
  payload: menuType
});

export const loadMenu = ({ filterBy, limit = 6, page, }) => (dispatch) => {
  let URL = `${domain}/api/v1/menus`;
  URL += (filterBy || limit || page) ? '?' : '';
  URL += (filterBy) ? `filter=${filterBy}&` : '';
  URL += (limit) ? `limit=${limit}&` : '';
  URL += (page) ? `page=${page}` : '';
  return axios.get(URL).then((response) => {
    if (!response.data.menus) {
      return dispatch(noMenuTypeYet(filterBy));
    }
    return dispatch(loadMenuSuccess(response.data));
  })
    .catch(error => error);
};
