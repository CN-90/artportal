import axios from 'axios';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
  USER_UPDATE_REQUEST,
  SET_USER_PROFILE,
  USER_PROFILE_CLEAR,
} from './../constants/userConstants';
import { uploadIconPhoto, uploadBannerPhoto } from './../utility/images';

export const loginUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    let { data } = await axios.post('/api/users/login', userInfo, {
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    let { data } = await axios.post('/api/users', userInfo, {
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  document.location.href = '/signin';
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    const { data } = await axios.get(`/api/users/${id}`);

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setProfile = (userProfile) => (dispatch) => {
  dispatch({ type: SET_USER_PROFILE, payload: userProfile });
};

export const clearProfile = () => (dispatch) => {
  dispatch({ type: USER_PROFILE_CLEAR });
};

export const updateUser = (userDetails) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState((state) => state.userLogin);
    let userImage = null;
    let updatedFields = {};

    if (userDetails.userImage) {
      console.log('Icon image detected.');
      const { data } = await uploadIconPhoto(userDetails.userImage, userInfo);
      updatedFields = { userImage: data };
    }

    if (userDetails.bannerImage) {
      const { data } = await uploadBannerPhoto(
        userDetails.bannerImage,
        userInfo
      );
      console.log(data);
      updatedFields = { ...updatedFields, bannerImage: data };
    }

    const { data } = await axios.put(
      `/api/users/${userInfo._id}`,
      { ...updatedFields, bio: userDetails.bio, website: userDetails.website },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    // dispatch({ type: USER_UPDATE_SUCCESS, payload: updated });
    // console.log(updatedUser);
  } catch (error) {}
};
