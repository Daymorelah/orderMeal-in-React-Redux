import axios from 'axios';
import * as actionTypes from './actionTypes';

const domain = (process.env.NODE_ENV !== 'production')
  ? process.env.DEVELOPMENT_URL : process.env.PRODUCTION_URL;

export const loadMenuSuccess = response => ({
  type: actionTypes.LOAD_MENU_SUCCESS,
  menus: response.menus,
});

export const noMenuTypeYet = menuType => ({
  type: actionTypes.NO_MENU_TYPE_YET,
  payload: menuType
});

export const loadMenu = filterBy => (dispatch) => {
  let URL = '';
  if (filterBy.length) {
    const filter = `?filter=${filterBy}`;
    URL = `${domain}/api/v1/menus${filter}`;
  } else {
    URL = `${domain}/api/v1/menus`;
  }
  return axios.get(URL).then((response) => {
    if (!response.data.menus) {
      return dispatch(noMenuTypeYet(filterBy));
    }
    return dispatch(loadMenuSuccess(response.data));
  })
    .catch(error => error);
};
