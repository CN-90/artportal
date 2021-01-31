import axios from 'axios';
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_LIST_FAILURE,
  POST_CREATE_FAILURE,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
} from '../constants/postConstants';

export const createPost = (postDetails) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });
    let {
      userLogin: { userInfo },
    } = getState((state) => state.userLogin);

    let form = new FormData();
    form.append('image', postDetails.image);
    let {
      data: { imageUrl, key },
    } = await axios.post('/api/image-upload', form, {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    let newpost = await axios.post(
      '/api/posts',
      {
        description: postDetails.title,
        image: { imageUrl, key },
      },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: POST_CREATE_SUCCESS, payload: newpost });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    let {
      data: { posts },
    } = await axios.get('/api/posts');
    dispatch({ type: POST_LIST_SUCCESS, payload: posts });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
