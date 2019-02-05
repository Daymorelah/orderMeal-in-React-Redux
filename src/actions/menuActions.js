import axios from 'axios';
import * as actionTypes from './actionTypes';

const domain = (process.env.NODE_ENV === 'development')
  ? 'http://localhost:2022' : process.env.PRODUCTION_URL;

export const loadMenuSuccess = response => ({
  type: actionTypes.LOAD_MENU_SUCCESS,
  menu: response.menu,
});

export const noMenuTypeYet = menuType => ({
  type: actionTypes.NO_MENU_TYPE_YET,
  payload: menuType
});

export const loadMenu = filterBy => (dispatch) => {
  let URL = '';
  if (filterBy.length) {
    const filter = `?filter=${filterBy}`;
    URL = `${domain}/api/v1/menu${filter}`;
  } else {
    URL = `${domain}/api/v1/menu`;
  }
  return axios.get(URL).then((response) => {
    if (!response.data.data.menu) {
      return dispatch(noMenuTypeYet(filterBy));
    }
    return dispatch(loadMenuSuccess(response.data.data));
  })
    .catch(error => error);
};