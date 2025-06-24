import * as MoviesConstants from "../Constants/MoviesConstants";
import * as MoviesApi from "../APIs/MoviesServices";
import { ErrorAction, tokenProtection } from "../Reducers/Protection";
import toast from "react-hot-toast";
import { fetchNowPlayingMovies } from "../../Data/FiltersData";

// get all movies action
const getMoviesAction = (params = {}) => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_LIST_REQUEST });

    const response = await MoviesApi.getMoviesService(params);

    const formatted = response.results.map((movie) => ({
      _id: movie.id,
      name: movie.title || movie.name,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : null,
      bgImage: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        : null,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
      original_language: movie.original_language,
    }));

    dispatch({
      type: MoviesConstants.MOVIES_LIST_SUCCESS,
      payload: formatted,
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
    const formatted = {
      _id: response.id,
      name: response.title || response.name,
      image: response.poster_path
        ? `https://image.tmdb.org/t/p/w500/${response.poster_path}`
        : null,
      bgImage: response.backdrop_path
        ? `https://image.tmdb.org/t/p/w500/${response.backdrop_path}`
        : null,
      vote_average: response.vote_average,
      vote_count: response.vote_count,
      release_date: response.release_date,
      overview: response.overview,
      original_language: response.original_language,
      genre: response.genres.map((genre) => genre.name),
      homepage: response.homepage,
      trailerUrl: response.trailerUrl,
    };
    dispatch({
      type: MoviesConstants.MOVIES_BY_ID_SUCCESS,
      payload: formatted,
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

    const formatted = response.map((movie) => ({
      _id: movie.id,
      name: movie.title || movie.name,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : null,
      bgImage: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        : null,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    }));
    dispatch({
      type: MoviesConstants.MOVIES_TOP_RATED_SUCCESS,
      payload: formatted,
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
    const formatted = response.map((movie) => ({
      _id: movie.id,
      name: movie.title || movie.name,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : null,
      bgImage: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        : null,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    }));
    dispatch({
      type: MoviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: formatted,
    });
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.MOVIES_RANDOM_FAIL);
  }
};

const updateFilters = (filters) => ({
  type: MoviesConstants.UPDATE_FILTERS,
  payload: filters
});

const applyFilters = () => ({
  type: MoviesConstants.APPLY_FILTERS
});

const fetchFilteredMovies = (filters) => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_LIST_REQUEST });
    
    // Convert genre to with_genres for API call
    const apiParams = {
      ...filters,
      with_genres: filters.genre,
      page: filters.page || 1
    };
    
    const response = await MoviesApi.getMoviesService(apiParams);
    
    const formatted = response.results.map((movie) => ({
      _id: movie.id,
      name: movie.title || movie.name,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : null,
      bgImage: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        : null,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
      original_language: movie.original_language,
      genre_ids: movie.genre_ids.map((id) => id.toString()),
    }));

    dispatch({
      type: MoviesConstants.MOVIES_LIST_SUCCESS,
      payload: {
        movies: formatted,
        ...filters
      }
    });
  } catch (error) {
    ErrorAction(error, dispatch, MoviesConstants.MOVIES_LIST_FAIL);
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
  updateFilters,
  applyFilters,
  fetchFilteredMovies,
};
