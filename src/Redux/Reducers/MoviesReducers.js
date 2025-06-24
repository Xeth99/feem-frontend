import * as moviesConstants from "../Constants/MoviesConstants";

// GET ALL MOVIES
export const moviesListReducer = (
  state = {
    movies: [],
    filteredMovies: [],
    filters: {
      language: "",
      genre: "", // Changed from with_genres to match component
      year: "",
      page: 1,
    },
    isLoading: false,
    isError: null
  },
  action
) => {
  switch (action.type) {
    case moviesConstants.MOVIES_LIST_REQUEST:
      return { ...state, isLoading: true, isError: null };

    case moviesConstants.MOVIES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        movies: action.payload.movies || action.payload,
        filteredMovies: action.payload.movies || action.payload,
        filters: {
          ...state.filters,
          ...(action.payload.language && { language: action.payload.language }),
          ...(action.payload.genre && { genre: action.payload.genre }),
          ...(action.payload.year && { year: action.payload.year }),
          ...(action.payload.page && { page: action.payload.page }),
        }
      };

    case moviesConstants.MOVIES_LIST_FAIL:
      return { ...state, isLoading: false, isError: action.payload };

    case moviesConstants.MOVIES_LIST_RESET:
      return {
        movies: [],
        filteredMovies: [],
        filters: {
          language: "",
          genre: "",
          year: "",
          page: 1,
        },
        isLoading: false,
        isError: null
      };

    case moviesConstants.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };

    case moviesConstants.APPLY_FILTERS:
      // Client-side filtering if needed
      const { language, genre, year } = state.filters;
      let filtered = state.movies;
      
      if (language) {
        filtered = filtered.filter(movie => 
          movie.original_language === language
        );
      }
      
      if (genre) {
        filtered = filtered.filter(movie => 
          movie.genre_ids.includes(Number(genre))
        );
      }
      
      if (year) {
        filtered = filtered.filter(movie => 
          movie.release_date?.startsWith(year)
        );
      }
      
      return {
        ...state,
        filteredMovies: filtered
      };

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
      return { ...state, isLoading: false, movies: action.payload };
    case moviesConstants.MOVIES_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIES_RANDOM_RESET:
      return { movies: [] };
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
      return { ...state, isLoading: false, movies: action.payload };
    case moviesConstants.MOVIES_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIES_TOP_RATED_RESET:
      return { movies: [] };
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

// ADD MOVIE
export const addMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.ADD_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstants.ADD_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.ADD_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.ADD_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// CASTS
export const CastsReducer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case moviesConstants.ADD_CAST:
      return { casts: [...state.casts, action.payload] };
    case moviesConstants.EDIT_CAST:
      return {
        casts: state.casts.map((cast) =>
          cast.id === action.payload.id ? action.payload : cast
        ),
      };
    case moviesConstants.DELETE_CAST:
      return {
        casts: state.casts.filter((cast) => cast.id !== action.payload),
      };
    case moviesConstants.RESET_CAST:
      return { casts: [] };
    default:
      return state;
  }
};

// UPDATE MOVIE
export const updateMovieReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case moviesConstants.UPDATE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstants.UPDATE_MOVIE_SUCCESS:
      return { isLoading: false, movie: action.payload, isSuccess: true };
    case moviesConstants.UPDATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.UPDATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

export const getMoviesGenre = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.MOVIE_GENRE_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIE_GENRE_SUCCESS:
      return { isLoading: false };
    case moviesConstants.MOVIE_GENRE_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIE_GENRE_RESET:
      return {};
    default:
      return state;
  }
};

export const getMoviesLanguage = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.MOVIE_LANG_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIE_LANG_SUCCESS:
      return { isLoading: false };
    case moviesConstants.MOVIE_LANG_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIE_LANG_REQUEST:
      return {};
    default:
      return state;
  }
};
