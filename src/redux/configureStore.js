import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
import { favorites } from "./favorites";
import { Auth } from "./auth";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";
import { InitialFeedback } from "./forms";

// createForms creates a reducer and takes care of the form.
// React-Redux-Form brings in its own set of support for to add in the necessary reducer functions and also the state information into our create store.
// so we don't need to write our own reducers or our action creators and so on,
// React-Redux-Form fills in all the details by itself.
// Now the reason why we supplied this initial feedback is that we can reset the form to its initial state after submitting the form.
// So, in that case, recall that even if we reload our component our form state will remain as such.
// So, when we submit the form, we want to reset the form.
// In order to do that, we need to add in a new action to dispatch it in the main component.The react-redux-forms provide us actions that can be imported in the main component and dispatched.

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      auth: Auth,
      favorites,
      ...createForms({
        feedback: InitialFeedback,
      }),
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
// applyMiddleware returns store enhancers from our passed in middlewares.
