import * as ActionTypes from "./ActionTypes";

export const Comments = (
  state = {
    errorMsg: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        comments: action.payload,
      };

    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        comments: [],
      };
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      // concat() is an immutable action as it doesn't change the existing array but creates a new array
      return { ...state, comments: state.comments.concat(comment) };
    default:
      return state;
  }
};
