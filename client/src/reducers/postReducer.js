import {
  POST_LIST_FAILURE,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from './../constants/postConstants';

export const postListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case POST_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case POST_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'POST_CREATE_REQUEST':
      return { loading: true };
    case 'POST_CREATE_SUCCESS':
      return { loading: false, post: action.payload };
    case 'POST_CREATE_FAILURE':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
  }
};
