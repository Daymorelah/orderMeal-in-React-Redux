import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.PLACE_ORDER_SUCCESS:
      return [
        ...state,
        action.order
      ];
    case actionTypes.PLACE_ORDER_ERROR:
    default:
      return state;
  }
};
