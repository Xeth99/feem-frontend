import * as moviesConstants from "../Constants/MoviesConstants";

// GET ALL MOVIES
export const moviesListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_LIST_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case moviesConstants.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIES_LIST_RESET:
      return {};
    default:
      return state;
  }
};

// GET RANDOM MOVIES
export const moviesRandomReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_RANDOM_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_RANDOM_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case moviesConstants.MOVIES_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIES_RANDOM_RESET:
      return {};
    default:
      return state;
  }
};

// GET MOVIE DETAILS
export const moviesByIdReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_BY_ID_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_BY_ID_SUCCESS:
      return { isLoading: false, movie: action.payload };
    case moviesConstants.MOVIES_BY_ID_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIES_BY_ID_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// GET MOVIE TOP RATED
export const moviesTopRatedReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_TOP_RATED_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_TOP_RATED_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case moviesConstants.MOVIES_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIES_TOP_RATED_RESET:
      return {};
    default:
      return state;
  }
};

// ADD MOVIE REVIEWS
export const addMovieReviewReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case moviesConstants.ADD_MOVIE_REVIEW_REQUEST:
      return { isLoading: true };
    case moviesConstants.ADD_MOVIE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true, review: action.payload };
    case moviesConstants.ADD_MOVIE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.ADD_MOVIE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE MOVIE
export const deleteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstants.DELETE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.DELETE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE ALL MOVIES
export const deleteAllMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.DELETE_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case moviesConstants.DELETE_ALL_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.DELETE_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.DELETE_ALL_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};
