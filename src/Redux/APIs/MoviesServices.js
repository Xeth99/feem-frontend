import Axios from "./Axios";

// ********** PUBLIC APIs **********

// Get all movies API function
const getMoviesService = async ({ language, region, page, with_genres }) => {
  const { data } = await Axios.get(
    `${process.env.REACT_APP_API_URL}/movies/tmdb/now_playing`,
    {
      params: {
        language,
        region,
        page,
        with_genres,
      },
    }
  );
  console.log(data);
  return data;
};

console.log("API URL:", process.env.REACT_APP_API_URL);

// get random movies API function
const getRandomMoviesService = async () => {
  const { data } = await Axios.get(
    `${process.env.REACT_APP_API_URL}/movies/tmdb/popular`
  );
  return data;
};

// get movie by id API function
const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(
    `${process.env.REACT_APP_API_URL}/movies/tmdb/movie/${id}/with-video`
  );
  return data;
};

// get top rated movies API function
const getTopRatedMoviesService = async () => {
  const { data } = await Axios.get(
    `${process.env.REACT_APP_API_URL}/movies/tmdb/rated/top`
  );
  return data;
};

// get movie genre
const getMovieGenre = async () => {
  const { data } = await Axios.get(
    `${process.env.REACT_APP_API_URL}/movies/tmdb/genre/movie/list`
  );
  return data;
};

const getMoviesLanguages = async () => {
  const { data } = await Axios.get(
    `${process.env.REACT_APP_API_URL}/movies/configuration/languages`
  );
  return data;
};

// review movies API function
const reviewMovieService = async (id, token, review) => {
  const { data } = await Axios.post(
    `${process.env.REACT_APP_API_URL}/movies/${id}/reviews`,
    review,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// delete movie API function
const deleteMovieService = async (id, token) => {
  const { data } = await Axios.delete(
    `${process.env.REACT_APP_API_URL}/movies/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// delete all movies API function
const deleteAllMoviesService = async (token) => {
  const { data } = await Axios.delete(
    `${process.env.REACT_APP_API_URL}/movies`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// create movie API function
const addMovieService = async (movie, token) => {
  const { data } = await Axios.post(
    `${process.env.REACT_APP_API_URL}/movies`,
    movie,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

// update movie API function
const updateMovieService = async (token, id, movie) => {
  const { data } = await Axios.put(
    `${process.env.REACT_APP_API_URL}/movies/${id}`,
    movie,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export {
  getMoviesService,
  getRandomMoviesService,
  getMovieByIdService,
  getTopRatedMoviesService,
  reviewMovieService,
  deleteMovieService,
  deleteAllMoviesService,
  addMovieService,
  updateMovieService,
  getMoviesLanguages,
  getMovieGenre,
};
