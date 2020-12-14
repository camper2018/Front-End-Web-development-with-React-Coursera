import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";

export const initialState = {
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS,
};
// We need to set up the reducer function because our store needs to know what to do when an action is dispatched to it.
export const Reducer = (state = initialState, action) => {
  return state;
};
