import * as ActionTypes from "./ActionTypes";

// We need to set up the reducer function because our store needs to know what to do when an action is dispatched to it.
export const Dishes = (
  state = {
    isLoading: true,
    errorMsg: null,
    dishes: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        dishes: action.payload,
      };

    case ActionTypes.DISHES_LOADING:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
        dishes: [],
      };

    case ActionTypes.DISHES_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        dishes: [],
      };

    default:
      return state;
  }
};
