import * as actionTypes from '../../src/actions/actionTypes';
import menuReducer from '../../src/reducers/mealsOrderedReducer';

describe('Unit test for the smeals ordered reducer ', () => {
  it('should return the initial state of the store ', () => {
    expect(menuReducer(undefined, {})).toEqual([]);
  });
  it('should update the store when a get place order '
    + 'request is successful ', () => {
    const orderCreated = [{
      id: 8,
      name: 'Chidinma',
      meal: [
        'Indomie and no egg',
        'Jollof rice and chicken',
      ],
    }];
    const mealsOrderedActionDispatched = {
      type: actionTypes.PLACE_ORDER_SUCCESS,
      order: orderCreated,
    };
    expect(menuReducer([], mealsOrderedActionDispatched))
      .toEqual(orderCreated);
  });
});
