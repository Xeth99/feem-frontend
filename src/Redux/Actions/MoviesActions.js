import * as MoviesConstants from "../Constants/MoviesConstants";
import * as MoviesApi from "../APIs/MoviesServices";
import { ErrorAction, tokenProtection } from "../Reducers/Protection";
import toast from "react-hot-toast";

// get all movies action
const getMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: MoviesConstants.MOVIES_LIST_REQUEST });
      const response = await MoviesApi.getMoviesService({
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber,
      });
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

export {
  getMoviesAction,
  getMovieByIdAction,
  getTopRatedMoviesAction,
  getRandomMoviesAction,
  addMovieReviewAction,
};
