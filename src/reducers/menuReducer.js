import * as actionTypes from '../actions/actionTypes';

export default (state = { menu: [], noMenu: '' }, action) => {
  switch (action.type) {
    case actionTypes.LOAD_MENU_SUCCESS:
      return {
        menus: [...action.menus],
        noMenu: ''
      };
    case actionTypes.NO_MENU_TYPE_YET:
      return {
        menu: [],
        noMenu: action.payload
      };
    default:
      return state;
  }
};
