import * as MoviesConstants from "../Constants/MoviesConstants";
import * as MoviesApi from "../APIs/MoviesServices";
import { ErrorAction, tokenProtection } from "../Reducers/Protection";
import toast from "react-hot-toast";

// get all movies action
const getMoviesAction =
  () =>
  async (dispatch) => {
    try {
      dispatch({ type: MoviesConstants.MOVIES_LIST_REQUEST });
      const response = await MoviesApi.getMoviesService();
      dispatch({
        type: MoviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorAction(error, dispatch, MoviesConstants.MOVIES_LIST_FAIL);
    }
  };

// get movie by id action
const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_BY_ID_REQUEST });
    const response = await MoviesApi.getMovieByIdService(id);
    dispatch({
      type: MoviesConstants.MOVIES_BY_ID_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.MOVIES_BY_ID_FAIL);
  }
};

// get top rated movies action
const getTopRatedMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_TOP_RATED_REQUEST });
    const response = await MoviesApi.getTopRatedMoviesService();
    dispatch({
      type: MoviesConstants.MOVIES_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.MOVIES_TOP_RATED_FAIL);
  }
};

// get random movies action
const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_RANDOM_REQUEST });
    const response = await MoviesApi.getRandomMoviesService();
    dispatch({
      type: MoviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.MOVIES_RANDOM_FAIL);
  }
};

// add movie review action
const addMovieReviewAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: MoviesConstants.ADD_MOVIE_REVIEW_REQUEST });
      const response = await MoviesApi.reviewMovieService(
        id,
        tokenProtection(getState),
        review
      );
      dispatch({
        type: MoviesConstants.ADD_MOVIE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added successfully!");
      dispatch({ type: MoviesConstants.ADD_MOVIE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorAction(error, dispatch, MoviesConstants.ADD_MOVIE_REVIEW_FAIL);
    }
  };

// delete movie action
const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.DELETE_MOVIE_REQUEST });
    await MoviesApi.deleteMovieService(id, tokenProtection(getState));
    dispatch({
      type: MoviesConstants.DELETE_MOVIE_SUCCESS,
    });
    toast.success("Movie deleted!");
    dispatch(getMoviesAction());
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.DELETE_MOVIE_FAIL);
  }
};

// delete all movies action
const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.DELETE_ALL_MOVIES_REQUEST });
    await MoviesApi.deleteAllMoviesService(tokenProtection(getState));
    dispatch({
      type: MoviesConstants.DELETE_ALL_MOVIES_SUCCESS,
    });
    toast.success("All movies deleted!");
    dispatch(getMoviesAction());
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

// add movie action
const addMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.ADD_MOVIE_REQUEST });
    const response = await MoviesApi.addMovieService(
      movie,
      tokenProtection(getState)
    );
    dispatch({
      type: MoviesConstants.ADD_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie added successfully!");
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.ADD_MOVIE_FAIL);
  }
};

// update movie action
const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: MoviesConstants.UPDATE_MOVIE_REQUEST });
    const response = await MoviesApi.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );
    dispatch({
      type: MoviesConstants.UPDATE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie updated successfully!");
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.UPDATE_MOVIE_FAIL);
  }
};

// ********* CASTS *********

// add cast action
const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: MoviesConstants.ADD_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// remove cast action
const deleteCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: MoviesConstants.DELETE_CAST, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// update cast action
const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: MoviesConstants.EDIT_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// delete all cast action
const deleteAllCastAction = () => async (dispatch) => {
  dispatch({ type: MoviesConstants.RESET_CAST });
  localStorage.removeItem("casts");
};

export {
  getMoviesAction,
  getMovieByIdAction,
  getTopRatedMoviesAction,
  getRandomMoviesAction,
  addMovieReviewAction,
  deleteMovieAction,
  deleteAllMoviesAction,
  addMovieAction,
  addCastAction,
  deleteCastAction,
  updateCastAction,
  deleteAllCastAction,
  updateMovieAction,
};
