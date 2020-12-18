import { DISHES } from "../shared/dishes";
// We need to set up the reducer function because our store needs to know what to do when an action is dispatched to it.
export const Dishes = (state = DISHES, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
