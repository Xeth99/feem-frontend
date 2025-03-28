import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
import { toast } from "react-hot-toast";
import { ErrorAction, tokenProtection } from "../Reducers/Protection";

// Login action
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(datas);
    localStorage.setItem("userInfo", JSON.stringify(response));
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    toast.success("Logged in successfully");
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(datas);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    toast.success("Registered successfully");
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile updated successfully!");
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({
      type: userConstants.USER_DELETE_PROFILE_SUCCESS,
    });
    toast.success("Profile deleted!");
    dispatch(logoutAction());
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

// change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

// get favorite movies action
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
    const response = await userApi.getFavoriteMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
  }
};

// delete favorite movies action
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST });
    userApi.deleteFavoriteMoviesService(tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS,
    });
    toast.success("Favorite movies deleted!");
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIES_FAIL);
  }
};

// user likes movies action
const userLikeMovieAction = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
    const response = await userApi.likeMovieService(
      movieId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie added to favorites!");
    dispatch(getFavoriteMoviesAction());
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
  }
};

// admin get all users action
const adminGetAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userApi.getAllUsersService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

// admin delete all User action
const adminDeleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    await userApi.deleteUserService(id, tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
    });
    toast.success("User deleted!");
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteMoviesAction,
  deleteFavoriteMoviesAction,
  adminGetAllUsersAction,
  adminDeleteUserAction,
  userLikeMovieAction,
};
